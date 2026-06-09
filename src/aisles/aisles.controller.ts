import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAisleDto } from './dto/create-aisle.dto';

@ApiTags('Pasillos y Ubicaciones')
@Controller('aisles')
export class AislesController {

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pasillo en la tienda' })
  @ApiResponse({ status: 201, description: 'Pasillo configurado con éxito.' })
  create(@Body() createAisleDto: CreateAisleDto) {
    // ...
  }

  @Get(':id/locations')
  @ApiOperation({ summary: 'Obtener todos los estantes/ubicaciones de un pasillo específico' })
  @ApiResponse({ status: 200, description: 'Retorna la lista de estantes asociados al pasillo.' })
  getLocationsByAisle(@Param('id') id: string) {
    // Lógica para devolver estantes (ej. A1, B2) asociados a este pasillo
  }
}