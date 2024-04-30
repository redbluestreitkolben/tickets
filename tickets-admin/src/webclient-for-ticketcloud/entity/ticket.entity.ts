import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, IsNull, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

export enum ticketStatus {
    vacant ="vacant",
    reserved = "reserved",
    sold = "sold",
    pending = "pending"
}

@Entity()
export class Ticket {

    @PrimaryColumn()
    id: string

    @Column()
    ticketNumber: string

    @Column()
    price: string

    @Column()
    ticketType: string

    @ManyToOne(()=> Order, (order) => order.tickets)
    @JoinColumn({name:"orderId", referencedColumnName: "id"})
    order: Order

    @Column({
    })
    ownerName: string
}