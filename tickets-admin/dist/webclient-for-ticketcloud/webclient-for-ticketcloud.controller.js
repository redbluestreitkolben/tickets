"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebclientForTicketcloudController = void 0;
const common_1 = require("@nestjs/common");
const webclient_for_ticketcloud_service_1 = require("./webclient-for-ticketcloud.service");
let WebclientForTicketcloudController = class WebclientForTicketcloudController {
    constructor(webclient) {
        this.webclient = webclient;
    }
    async getAllTickets(response) {
        return response.set({ 'Access-Control-Allow-Origin': '*' }).json([await this.webclient.getOrders()]);
    }
    async getAllTicketsRaw(response) {
        return response.set({ 'Access-Control-Allow-Origin': '*' }).json([await this.webclient.fetchData()]);
    }
};
exports.WebclientForTicketcloudController = WebclientForTicketcloudController;
__decorate([
    (0, common_1.Get)("/tickets-cloud"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebclientForTicketcloudController.prototype, "getAllTickets", null);
__decorate([
    (0, common_1.Get)("/tickets-raw"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebclientForTicketcloudController.prototype, "getAllTicketsRaw", null);
exports.WebclientForTicketcloudController = WebclientForTicketcloudController = __decorate([
    (0, common_1.Controller)('/api'),
    __metadata("design:paramtypes", [webclient_for_ticketcloud_service_1.WebclientForTicketcloudService])
], WebclientForTicketcloudController);
//# sourceMappingURL=webclient-for-ticketcloud.controller.js.map