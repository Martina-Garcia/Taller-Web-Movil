import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
 
@Injectable()
export class WorkersService {
  constructor(private prisma: PrismaService) {}
 
  async create(dto: any) {
    return this.prisma.worker.create({ data: dto });
  }
 
  async findAll() {
    return this.prisma.worker.findMany({ orderBy: { id: 'asc' } });
  }
 
  async findOne(id: number) {
    const worker = await this.prisma.worker.findUnique({ where: { id } });
    if (!worker) throw new NotFoundException(`Trabajador con ID ${id} no encontrado`);
    return worker;
  }
 
  async update(id: number, dto: any) {
    await this.findOne(id);
    return this.prisma.worker.update({ where: { id }, data: dto });
  }
 
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.worker.delete({ where: { id } });
  }
}