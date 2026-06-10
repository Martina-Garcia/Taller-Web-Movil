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
exports.CreateAisleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateAisleDto {
    numero;
    nombre;
    categoria;
    estantes;
    color;
    estado;
    notas;
}
exports.CreateAisleDto = CreateAisleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 9, description: 'Número del pasillo' }),
    __metadata("design:type", Number)
], CreateAisleDto.prototype, "numero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cuidado Personal', description: 'Nombre descriptivo' }),
    __metadata("design:type", String)
], CreateAisleDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Higiene', description: 'Categoría de los productos' }),
    __metadata("design:type", String)
], CreateAisleDto.prototype, "categoria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'Cantidad de estantes' }),
    __metadata("design:type", Number)
], CreateAisleDto.prototype, "estantes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#ff9f43', description: 'Color en formato HEX' }),
    __metadata("design:type", String)
], CreateAisleDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Activo', description: 'Estado actual del pasillo' }),
    __metadata("design:type", String)
], CreateAisleDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Revisar stock diario', required: false }),
    __metadata("design:type", String)
], CreateAisleDto.prototype, "notas", void 0);
//# sourceMappingURL=create-aisle.dto.js.map