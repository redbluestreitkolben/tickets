import { Module } from '@nestjs/common';
import { WebclientForTicketcloudModule } from './webclient-for-ticketcloud/webclient-for-ticketcloud.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { Ticket } from './webclient-for-ticketcloud/entity/ticket.entity';
import { Order } from './webclient-for-ticketcloud/entity/order.entity';

@Module({
  imports: [WebclientForTicketcloudModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Order, Ticket],
      synchronize: true,
    }),
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
