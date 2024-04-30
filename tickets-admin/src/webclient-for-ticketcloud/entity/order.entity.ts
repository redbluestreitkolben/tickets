import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

export enum orderStatus {
    done ="done",
    executed = "executed",
    cancelled = "cancelled",
    expired = "expired"
}

@Entity()
export class Order {
  @PrimaryColumn()
  id: string;

  @Column({
    type: "enum",
    enum: orderStatus,
    default: orderStatus.executed})
  status: orderStatus;

  @Column()
  orderNumber: number

  @Column()
  totalPrice: string

  @Column()
  customerName: string

  @Column()
  email: string

  @Column()
  phone: string;

  @OneToMany(() => Ticket, (ticket) => ticket.order, {
    eager:true
  })
  tickets: Ticket[]
}

