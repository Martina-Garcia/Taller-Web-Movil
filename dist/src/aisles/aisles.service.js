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
exports.AislesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AislesService = class AislesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.aisle.create({ data: dto });
    }
    async findAll() {
        return this.prisma.aisle.findMany({ orderBy: { numero: 'asc' } });
    }
    async findOne(id) {
        const aisle = await this.prisma.aisle.findUnique({ where: { id } });
        if (!aisle)
            throw new common_1.NotFoundException(`Pasillo con ID ${id} no encontrado`);
        return aisle;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.aisle.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.aisle.delete({ where: { id } });
    }
};
exports.AislesService = AislesService;
exports.AislesService = AislesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AislesService);
//# sourceMappingURL=aisles.service.js.map