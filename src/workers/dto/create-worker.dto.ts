import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerDto {
  @ApiProperty({ example: 'Carlos Martínez', description: 'Nombre completo del trabajador' })
  nombre: string;

  @ApiProperty({ example: '12.345.678-9', description: 'RUT chileno válido' })
  rut: string;

  @ApiProperty({ example: 'Picker', description: 'Rol dentro del sistema' })
  rol: string;
}