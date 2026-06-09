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
exports.AislesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_aisle_dto_1 = require("./dto/create-aisle.dto");
let AislesController = class AislesController {
    create(createAisleDto) {
    }
    getLocationsByAisle(id) {
    }
};
exports.AislesController = AislesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo pasillo en la tienda' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Pasillo configurado con éxito.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_aisle_dto_1.CreateAisleDto]),
    __metadata("design:returntype", void 0)
], AislesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id/locations'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los estantes/ubicaciones de un pasillo específico' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retorna la lista de estantes asociados al pasillo.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AislesController.prototype, "getLocationsByAisle", null);
exports.AislesController = AislesController = __decorate([
    (0, swagger_1.ApiTags)('Pasillos y Ubicaciones'),
    (0, common_1.Controller)('aisles')
], AislesController);
//# sourceMappingURL=aisles.controller.js.map