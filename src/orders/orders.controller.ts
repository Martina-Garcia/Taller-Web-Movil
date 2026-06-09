import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Pedidos')
@Controller('orders')
export class OrdersController {

  @Post()
  @ApiOperation({ summary: 'Crear una nueva orden de picking' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    // ...
  }

  @Patch(':id/assign/:workerId')
  @ApiOperation({ summary: 'Asignar un pedido específico a un Picker' })
  @ApiParam({ name: 'id', description: 'ID del pedido' })
  @ApiParam({ name: 'workerId', description: 'ID del trabajador (Picker)' })
  @ApiResponse({ status: 200, description: 'Pedido asignado correctamente al trabajador.' })
  assignToWorker(@Param('id') id: string, @Param('workerId') workerId: string) {
    // Lógica para actualizar el pedido con el picker asignado
  }
}