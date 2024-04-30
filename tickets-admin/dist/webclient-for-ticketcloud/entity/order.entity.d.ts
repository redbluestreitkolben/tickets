import { Ticket } from './ticket.entity';
export declare enum orderStatus {
    done = "done",
    executed = "executed",
    cancelled = "cancelled",
    expired = "expired"
}
export declare class Order {
    id: string;
    status: orderStatus;
    orderNumber: number;
    totalPrice: string;
    customerName: string;
    email: string;
    phone: string;
    tickets: Ticket[];
}
