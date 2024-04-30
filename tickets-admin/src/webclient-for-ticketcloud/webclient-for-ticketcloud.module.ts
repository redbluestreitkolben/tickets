import { Module } from '@nestjs/common';
import { WebclientForTicketcloudController } from './webclient-for-ticketcloud.controller';
import { WebclientForTicketcloudService } from './webclient-for-ticketcloud.service';
import { Order } from './entity/order.entity';
import { Ticket } from './entity/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [WebclientForTicketcloudController],
  providers: [WebclientForTicketcloudService],
  imports: [TypeOrmModule.forFeature([Order, Ticket])],
  exports: [TypeOrmModule]
})
export class WebclientForTicketcloudModule {}
