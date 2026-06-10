import { ApiProperty } from '@nestjs/swagger';

// Clase secundaria para documentar los objetos dentro del arreglo de productos
class OrderItemDto {
  @ApiProperty({ example: 1, description: 'ID único del producto registrado' })
  prodId: number;

  @ApiProperty({ example: 3, description: 'Cantidad solicitada de unidades' })
  qty: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'P-2029', description: 'Código correlativo único del pedido' })
  num: string;

  @ApiProperty({ example: 'Benjamin Bustamante', description: 'Nombre completo del cliente' })
  cliente: string;

  @ApiProperty({ example: '+56 9 1234 5678', description: 'Teléfono de contacto' })
  tel: string;

  @ApiProperty({ example: 'Av. Providencia 1234, Dpto 5', description: 'Dirección (vacío si es retiro)' })
  direccion: string;

  @ApiProperty({ example: 'Despacho a domicilio', description: 'Modalidad (Despacho a domicilio o Retiro en tienda)' })
  entrega: string;

  @ApiProperty({ example: 1, description: 'ID del Picker asignado para la recolección' })
  pickerId: number;

  @ApiProperty({ example: 'Pendiente', description: 'Estado (Pendiente, En Proceso, Completado)' })
  estado: string;

  @ApiProperty({ example: '2026-06-09', description: 'Fecha de ingreso del pedido' })
  fecha: string;

  @ApiProperty({ type: [OrderItemDto], description: 'Arreglo con los ítems y cantidades correspondientes' })
  items: OrderItemDto[];
}