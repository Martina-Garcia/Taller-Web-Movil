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
exports.CreateWorkerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateWorkerDto {
    nombre;
    rut;
    turno;
    rol;
    tel;
    estado;
    pedidosHoy;
    pedidoActual;
}
exports.CreateWorkerDto = CreateWorkerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Carlos Martínez', description: 'Nombre completo del trabajador' }),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12.345.678-9', description: 'RUT identificador' }),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "rut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Turno A (08:00-16:00)', description: 'Bloque horario asignado' }),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "turno", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Picker', description: 'Rol dentro del supermercado (Picker, Supervisor)' }),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "rol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+56 9 8765 4321', description: 'Número de teléfono celular móvil' }),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "tel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Activo', description: 'Estado laboral (Activo, Vacaciones, Inactivo)' }),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, required: false, description: 'Pedidos completados en la jornada' }),
    __metadata("design:type", Number)
], CreateWorkerDto.prototype, "pedidosHoy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, required: false, nullable: true, description: 'ID del pedido actual' }),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "pedidoActual", void 0);
//# sourceMappingURL=create-worker.dto.js.map