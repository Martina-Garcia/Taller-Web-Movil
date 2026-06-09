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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_order_dto_1 = require("./dto/create-order.dto");
let OrdersController = class OrdersController {
    create(createOrderDto) {
    }
    assignToWorker(id, workerId) {
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva orden de picking' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Orden creada exitosamente.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/assign/:workerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Asignar un pedido específico a un Picker' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del pedido' }),
    (0, swagger_1.ApiParam)({ name: 'workerId', description: 'ID del trabajador (Picker)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido asignado correctamente al trabajador.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('workerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "assignToWorker", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('Pedidos'),
    (0, common_1.Controller)('orders')
], OrdersController);
//# sourceMappingURL=orders.controller.js.map