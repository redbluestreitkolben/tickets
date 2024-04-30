import { WebclientForTicketcloudService } from './webclient-for-ticketcloud.service';
import { Response } from 'express';
export declare class WebclientForTicketcloudController {
    private webclient;
    constructor(webclient: WebclientForTicketcloudService);
    getAllTickets(response: Response): Promise<any>;
    getAllTicketsRaw(response: Response): Promise<any>;
}
