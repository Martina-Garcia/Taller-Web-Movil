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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class OrderItemDto {
    prodId;
    qty;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID único del producto registrado' }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "prodId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Cantidad solicitada de unidades' }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "qty", void 0);
class CreateOrderDto {
    num;
    cliente;
    tel;
    direccion;
    entrega;
    pickerId;
    estado;
    fecha;
    items;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'P-2029', description: 'Código correlativo único del pedido' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "num", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Benjamin Bustamante', description: 'Nombre completo del cliente' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "cliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+56 9 1234 5678', description: 'Teléfono de contacto' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "tel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Av. Providencia 1234, Dpto 5', description: 'Dirección (vacío si es retiro)' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "direccion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Despacho a domicilio', description: 'Modalidad (Despacho a domicilio o Retiro en tienda)' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "entrega", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID del Picker asignado para la recolección' }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "pickerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pendiente', description: 'Estado (Pendiente, En Proceso, Completado)' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-06-09', description: 'Fecha de ingreso del pedido' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "fecha", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [OrderItemDto], description: 'Arreglo con los ítems y cantidades correspondientes' }),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
//# sourceMappingURL=create-order.dto.js.map