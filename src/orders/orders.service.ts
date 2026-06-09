import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
 
@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
 
  async create(dto: any) {
    return this.prisma.order.create({ data: dto });
  }
 
  async findAll() {
    return this.prisma.order.findMany({
      orderBy: { id: 'asc' },
      include: { picker: true },
    });
  }
 
  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { picker: true },
    });
    if (!order) throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    return order;
  }
 
  async update(id: number, dto: any) {
    await this.findOne(id);
    return this.prisma.order.update({ where: { id }, data: dto });
  }
 
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.order.delete({ where: { id } });
  }
}