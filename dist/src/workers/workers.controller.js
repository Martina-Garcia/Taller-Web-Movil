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
exports.WorkersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const workers_service_1 = require("./workers.service");
const create_worker_dto_1 = require("./dto/create-worker.dto");
let WorkersController = class WorkersController {
    workersService;
    constructor(workersService) {
        this.workersService = workersService;
    }
    create(dto) {
        return this.workersService.create(dto);
    }
    findAll() {
        return this.workersService.findAll();
    }
    findOne(id) {
        return this.workersService.findOne(+id);
    }
    update(id, dto) {
        return this.workersService.update(+id, dto);
    }
    remove(id) {
        return this.workersService.remove(+id);
    }
};
exports.WorkersController = WorkersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar un nuevo trabajador' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Trabajador creado exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_worker_dto_1.CreateWorkerDto]),
    __metadata("design:returntype", void 0)
], WorkersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los trabajadores' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de trabajadores' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorkersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un trabajador por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Trabajador encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Trabajador no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un trabajador' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WorkersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un trabajador' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Trabajador eliminado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkersController.prototype, "remove", null);
exports.WorkersController = WorkersController = __decorate([
    (0, swagger_1.ApiTags)('Trabajadores'),
    (0, common_1.Controller)('workers'),
    __metadata("design:paramtypes", [workers_service_1.WorkersService])
], WorkersController);
//# sourceMappingURL=workers.controller.js.map