import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
export declare class UsersService {
    private orderssRepository;
    constructor(orderssRepository: Repository<Order>);
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order | null>;
    remove(id: number): Promise<void>;
}
