import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { DataSource, Repository } from 'typeorm';
import { Order, orderStatus } from './entity/order.entity';
import { Ticket } from './entity/ticket.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebclientForTicketcloudService {

    constructor(
    @InjectRepository(Order)
    private orderssRepository: Repository<Order>,
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    private readonly configService: ConfigService
    ) {

    }
    @Cron(CronExpression.EVERY_MINUTE) //TODO: What if request impossible, Handle this later
    async fetchData() {
        try {
            const response = await axios({
                method: 'GET',
                url: 'https://ticketscloud.com/v2/resources/orders',
                headers: {
                    'Authorization': 'key ' + process.env.API_KEY //TODO: Change to Secrets
                }
              });
            this.persistData(response.data.data);
            console.log(response.data.data);
            return response.data.data;
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    async persistData(data: any[]) {
        function convertToOrderStatus(status: string): orderStatus{
            if(status === "done")
                return orderStatus.done;
            else if(status === "executed")
                return orderStatus.executed
            else if(status === "cancelled")
                return orderStatus.cancelled;
            else if(status === "expired")
                return orderStatus.expired;

            throw Error("Unknown value during conversion");
        }
        await data.forEach(async order => {
            let temp_order = await this.orderssRepository.findOneBy({id: order.id});
            
                let ticketArray = [];
                if(order.tickets.length != 0) {
                    order.tickets.forEach(ticket => {
                        let newTicket = this.ticketsRepository.manager.create(Ticket, {
                            id: ticket.id,
                            ticketNumber: ticket.number,
                            price: ticket.price,
                            ticketType: order.values["sets_values"][ticket.set].name,
                            ownerName: order?.settings?.customer?.name ?? "unknown"
                        });
                        this.ticketsRepository.manager.save(newTicket);
                        ticketArray.push(newTicket);
                    });
                }
                let newOrder = this.orderssRepository.manager.create(Order, {
                    id: order.id,
                    status: convertToOrderStatus(order.status),
                    orderNumber: order.number,
                    totalPrice: order.values.price,
                    customerName: order?.settings?.customer?.name ?? "unknown",
                    email: order?.settings?.customer?.email ?? "unknown",
                    phone: order?.settings?.customer?.phone ?? "unknown",
                    tickets: ticketArray
                });
            if(temp_order === null) {
                this.orderssRepository.manager.save(newOrder);
            } else {
                temp_order = newOrder;
                this.orderssRepository.manager.save(temp_order);
            }
        })
        console.log("persisted");
    }

    async getOrders() {
        return await this.orderssRepository.find({});
    }
}
