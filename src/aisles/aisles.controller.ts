import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AislesService } from './aisles.service';
import { CreateAisleDto } from './dto/create-aisle.dto';

@ApiTags('Pasillos')
@Controller('aisles')
export class AislesController {
  constructor(private readonly aislesService: AislesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pasillo' })
  @ApiResponse({ status: 201, description: 'Pasillo creado exitosamente' })
  create(@Body() dto: CreateAisleDto) {
    return this.aislesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los pasillos' })
  @ApiResponse({ status: 200, description: 'Lista de pasillos' })
  findAll() {
    return this.aislesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pasillo por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pasillo encontrado' })
  @ApiResponse({ status: 404, description: 'Pasillo no encontrado' })
  findOne(@Param('id') id: string) {
    return this.aislesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pasillo' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.aislesService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un pasillo' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Pasillo eliminado' })
  remove(@Param('id') id: string) {
    return this.aislesService.remove(+id);
  }
}