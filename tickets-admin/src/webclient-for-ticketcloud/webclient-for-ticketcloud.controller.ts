import { Controller, Get, Inject, Res } from '@nestjs/common';
import { WebclientForTicketcloudService } from './webclient-for-ticketcloud.service';
import { Response } from 'express';

@Controller('/api')
export class WebclientForTicketcloudController {

    constructor(private webclient: WebclientForTicketcloudService,
        ) {}


    @Get("/tickets-cloud")
    async getAllTickets(@Res() response: Response): Promise<any> {
        //const req = await this.webclient.fetchData();
        //return response.json([req]);
        return response.set({'Access-Control-Allow-Origin': '*'}).json([await this.webclient.getOrders()]);
    }

    @Get("/tickets-raw")
    async getAllTicketsRaw(@Res() response: Response): Promise<any> {
        //const req = await this.webclient.fetchData();
        //return response.json([req]);
        return response.set({'Access-Control-Allow-Origin': '*'}).json([await this.webclient.fetchData()]);
    }
}
