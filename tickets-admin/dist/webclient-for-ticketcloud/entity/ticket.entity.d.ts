import { Order } from './order.entity';
export declare enum ticketStatus {
    vacant = "vacant",
    reserved = "reserved",
    sold = "sold",
    pending = "pending"
}
export declare class Ticket {
    id: string;
    ticketNumber: string;
    price: string;
    ticketType: string;
    order: Order;
    ownerName: string;
}
