import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
 
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
 
  async create(dto: any) {
    return this.prisma.product.create({ data: dto });
  }
 
  async findAll() {
    return this.prisma.product.findMany({ orderBy: { id: 'asc' } });
  }
 
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    return product;
  }
 
  async update(id: number, dto: any) {
    await this.findOne(id);
    return this.prisma.product.update({ where: { id }, data: dto });
  }
 
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }
}