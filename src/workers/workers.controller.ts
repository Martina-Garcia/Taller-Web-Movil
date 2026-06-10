import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';

@ApiTags('Trabajadores')
@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo trabajador' })
  @ApiResponse({ status: 201, description: 'Trabajador creado exitosamente' })
  create(@Body() dto: CreateWorkerDto) {
    return this.workersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los trabajadores' })
  @ApiResponse({ status: 200, description: 'Lista de trabajadores' })
  findAll() {
    return this.workersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un trabajador por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Trabajador encontrado' })
  @ApiResponse({ status: 404, description: 'Trabajador no encontrado' })
  findOne(@Param('id') id: string) {
    return this.workersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un trabajador' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.workersService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un trabajador' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Trabajador eliminado' })
  remove(@Param('id') id: string) {
    return this.workersService.remove(+id);
  }
}