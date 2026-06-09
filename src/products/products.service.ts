import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
    { id: 1, name: 'Monster Energy Original', barcode: '74849302', category: 'Bebestibles', currentStock: 45, minStock: 10, shelf: 3, aisleId: 1 },
    { id: 2, name: 'Arroz Grado 1 1kg', barcode: '11223344', category: 'Abarrotes', currentStock: 120, minStock: 20, shelf: 1, aisleId: 2 }
  ];

  create(dto: any) {
    const newP = { id: this.products.length + 1, ...dto };
    this.products.push(newP);
    return newP;
  }
  findAll() { return this.products; }
  findOne(id: number) {
    const p = this.products.find(x => x.id === id);
    if (!p) throw new NotFoundException(`ID ${id} no existe`);
    return p;
  }
  update(id: number, dto: any) {
    const idx = this.products.findIndex(x => x.id === id);
    if (idx === -1) throw new NotFoundException(`ID ${id} no existe`);
    this.products[idx] = { ...this.products[idx], ...dto };
    return this.products[idx];
  }
  remove(id: number) {
    const idx = this.products.findIndex(x => x.id === id);
    if (idx === -1) throw new NotFoundException(`ID ${id} no existe`);
    return this.products.splice(idx, 1)[0];
  }
}