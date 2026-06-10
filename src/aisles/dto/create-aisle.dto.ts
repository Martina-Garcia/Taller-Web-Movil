import { ApiProperty } from '@nestjs/swagger';

export class CreateAisleDto {
  @ApiProperty({ example: 9, description: 'Número del pasillo' })
  numero: number;

  @ApiProperty({ example: 'Cuidado Personal', description: 'Nombre descriptivo' })
  nombre: string;

  @ApiProperty({ example: 'Higiene', description: 'Categoría de los productos' })
  categoria: string;

  @ApiProperty({ example: 4, description: 'Cantidad de estantes' })
  estantes: number;

  @ApiProperty({ example: '#ff9f43', description: 'Color en formato HEX' })
  color: string;

  @ApiProperty({ example: 'Activo', description: 'Estado actual del pasillo' })
  estado: string;

  @ApiProperty({ example: 'Revisar stock diario', required: false })
  notas: string;
}