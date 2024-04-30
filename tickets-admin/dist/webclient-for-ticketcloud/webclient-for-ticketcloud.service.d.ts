import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { Ticket } from './entity/ticket.entity';
export declare class WebclientForTicketcloudService {
    private orderssRepository;
    private ticketsRepository;
    constructor(orderssRepository: Repository<Order>, ticketsRepository: Repository<Ticket>);
    fetchData(): Promise<any>;
    persistData(data: any[]): Promise<void>;
    getOrders(): Promise<Order[]>;
}
