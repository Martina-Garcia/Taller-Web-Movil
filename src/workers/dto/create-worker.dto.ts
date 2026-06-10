import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerDto {
  @ApiProperty({ example: 'Carlos Martínez', description: 'Nombre completo del trabajador' })
  nombre: string;

  @ApiProperty({ example: '12.345.678-9', description: 'RUT identificador' })
  rut: string;

  @ApiProperty({ example: 'Turno A (08:00-16:00)', description: 'Bloque horario asignado' })
  turno: string;

  @ApiProperty({ example: 'Picker', description: 'Rol dentro del supermercado (Picker, Supervisor)' })
  rol: string;

  @ApiProperty({ example: '+56 9 8765 4321', description: 'Número de teléfono celular móvil' })
  tel: string;

  @ApiProperty({ example: 'Activo', description: 'Estado laboral (Activo, Vacaciones, Inactivo)' })
  estado: string;

  @ApiProperty({ example: 0, required: false, description: 'Pedidos completados en la jornada' })
  pedidosHoy?: number;

  @ApiProperty({ example: null, required: false, nullable: true, description: 'ID del pedido actual' })
  pedidoActual?: string;
}