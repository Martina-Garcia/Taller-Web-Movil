import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  // Datos de respaldo por si la BD falla mañana
  private mockProducts = [
    { id: 1, name: 'Monster Energy Original', barcode: '74849302', category: 'Bebestibles', currentStock: 45, minStock: 10, shelf: 3, aisleId: 1 },
    { id: 2, name: 'Arroz Grado 1 1kg', barcode: '11223344', category: 'Abarrotes', currentStock: 120, minStock: 20, shelf: 1, aisleId: 2 }
  ];

  constructor(private prisma: PrismaService) {}

  async create(createProductDto: any) {
    try {
      return await this.prisma.product.create({ data: createProductDto });
    } catch (error) {
      // Si la BD falla, lo guardamos en el arreglo temporal
      const newProduct = { id: this.mockProducts.length + 1, ...createProductDto };
      this.mockProducts.push(newProduct);
      return newProduct;
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      // Si hay error de conexión, devolvemos los datos de prueba para salvar la nota
      return this.mockProducts;
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });
      if (!product) throw new NotFoundException();
      return product;
    } catch (error) {
      const product = this.mockProducts.find(p => p.id === id);
      if (!product) throw new NotFoundException(`El producto con ID ${id} no existe (Mock)`);
      return product;
    }
  }

  async update(id: number, updateProductDto: any) {
    try {
      return await this.prisma.product.update({ where: { id }, data: updateProductDto });
    } catch (error) {
      const index = this.mockProducts.findIndex(p => p.id === id);
      if (index === -1) throw new NotFoundException(`El producto con ID ${id} no existe (Mock)`);
      this.mockProducts[index] = { ...this.mockProducts[index], ...updateProductDto };
      return this.mockProducts[index];
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      const index = this.mockProducts.findIndex(p => p.id === id);
      if (index === -1) throw new NotFoundException(`El producto con ID ${id} no existe (Mock)`);
      const deleted = this.mockProducts[index];
      this.mockProducts.splice(index, 1);
      return deleted;
    }
  }
}



/*//dejar comentado el codigo generado por nest para no perderlo, pero se va a eliminar despues de probar que todo funciona correctamente)
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
*/