import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@ApiTags('Pedidos')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  create(@Body() dto: any) {
    return this.ordersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pedido' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.ordersService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un pedido' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Pedido eliminado' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}