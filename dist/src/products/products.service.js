"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
let ProductsService = class ProductsService {
    products = [
        { id: 1, name: 'Monster Energy Original', barcode: '74849302', category: 'Bebestibles', currentStock: 45, minStock: 10, shelf: 3, aisleId: 1 },
        { id: 2, name: 'Arroz Grado 1 1kg', barcode: '11223344', category: 'Abarrotes', currentStock: 120, minStock: 20, shelf: 1, aisleId: 2 }
    ];
    create(dto) {
        const newP = { id: this.products.length + 1, ...dto };
        this.products.push(newP);
        return newP;
    }
    findAll() { return this.products; }
    findOne(id) {
        const p = this.products.find(x => x.id === id);
        if (!p)
            throw new common_1.NotFoundException(`ID ${id} no existe`);
        return p;
    }
    update(id, dto) {
        const idx = this.products.findIndex(x => x.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException(`ID ${id} no existe`);
        this.products[idx] = { ...this.products[idx], ...dto };
        return this.products[idx];
    }
    remove(id) {
        const idx = this.products.findIndex(x => x.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException(`ID ${id} no existe`);
        return this.products.splice(idx, 1)[0];
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map