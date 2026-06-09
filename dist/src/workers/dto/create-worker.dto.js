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
    rol;
}
exports.CreateWorkerDto = CreateWorkerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Carlos Martínez', description: 'Nombre completo del trabajador' }),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12.345.678-9', description: 'RUT chileno válido' }),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "rut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Picker', description: 'Rol dentro del sistema' }),
    __metadata("design:type", String)
], CreateWorkerDto.prototype, "rol", void 0);
//# sourceMappingURL=create-worker.dto.js.map