"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebclientForTicketcloudService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entity/order.entity");
const ticket_entity_1 = require("./entity/ticket.entity");
let WebclientForTicketcloudService = class WebclientForTicketcloudService {
    constructor(orderssRepository, ticketsRepository) {
        this.orderssRepository = orderssRepository;
        this.ticketsRepository = ticketsRepository;
    }
    async fetchData() {
        try {
            const response = await (0, axios_1.default)({
                method: 'GET',
                url: 'https://ticketscloud.com/v2/resources/orders',
                headers: {
                    'Authorization': 'key 8d1162bb9c27456c9c29e26844bd7327'
                }
            });
            this.persistData(response.data.data);
            console.log(response.data.data);
            return response.data.data;
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    async persistData(data) {
        function convertToOrderStatus(status) {
            if (status === "done")
                return order_entity_1.orderStatus.done;
            else if (status === "executed")
                return order_entity_1.orderStatus.executed;
            else if (status === "cancelled")
                return order_entity_1.orderStatus.cancelled;
            else if (status === "expired")
                return order_entity_1.orderStatus.expired;
            throw Error("Unknown value during conversion");
        }
        await data.forEach(async (order) => {
            let temp_order = await this.orderssRepository.findOneBy({ id: order.id });
            let ticketArray = [];
            if (order.tickets.length != 0) {
                order.tickets.forEach(ticket => {
                    let newTicket = this.ticketsRepository.manager.create(ticket_entity_1.Ticket, {
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
            let newOrder = this.orderssRepository.manager.create(order_entity_1.Order, {
                id: order.id,
                status: convertToOrderStatus(order.status),
                orderNumber: order.number,
                totalPrice: order.values.price,
                customerName: order?.settings?.customer?.name ?? "unknown",
                email: order?.settings?.customer?.email ?? "unknown",
                phone: order?.settings?.customer?.phone ?? "unknown",
                tickets: ticketArray
            });
            if (temp_order === null) {
                this.orderssRepository.manager.save(newOrder);
            }
            else {
                temp_order = newOrder;
                this.orderssRepository.manager.save(temp_order);
            }
        });
        console.log("persisted");
    }
    async getOrders() {
        return await this.orderssRepository.find({});
    }
};
exports.WebclientForTicketcloudService = WebclientForTicketcloudService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WebclientForTicketcloudService.prototype, "fetchData", null);
exports.WebclientForTicketcloudService = WebclientForTicketcloudService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WebclientForTicketcloudService);
//# sourceMappingURL=webclient-for-ticketcloud.service.js.map