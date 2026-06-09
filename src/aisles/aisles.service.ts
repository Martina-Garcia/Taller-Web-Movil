import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
 
@Injectable()
export class AislesService {
  constructor(private prisma: PrismaService) {}
 
  async create(dto: any) {
    return this.prisma.aisle.create({ data: dto });
  }
 
  async findAll() {
    return this.prisma.aisle.findMany({ orderBy: { numero: 'asc' } });
  }
 
  async findOne(id: number) {
    const aisle = await this.prisma.aisle.findUnique({ where: { id } });
    if (!aisle) throw new NotFoundException(`Pasillo con ID ${id} no encontrado`);
    return aisle;
  }
 
  async update(id: number, dto: any) {
    await this.findOne(id);
    return this.prisma.aisle.update({ where: { id }, data: dto });
  }
 
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.aisle.delete({ where: { id } });
  }
}