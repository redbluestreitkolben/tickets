import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Order)
    private orderssRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderssRepository.find();
  }

  findOne(id: string): Promise<Order | null> {
    return this.orderssRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.orderssRepository.delete(id);
  }
}