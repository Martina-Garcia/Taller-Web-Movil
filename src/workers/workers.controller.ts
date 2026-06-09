import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@ApiTags('Trabajadores')
@Controller('workers')
export class WorkersController {

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo trabajador (Picker o Supervisor)' })
  @ApiResponse({ status: 201, description: 'El trabajador ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createWorkerDto: CreateWorkerDto) {
    // ...
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los trabajadores activos e inactivos' })
  @ApiResponse({ status: 200, description: 'Retorna un arreglo de trabajadores.' })
  findAll() {
    // ...
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener el detalle de un trabajador por su ID' })
  @ApiParam({ name: 'id', description: 'ID numérico del trabajador' })
  @ApiResponse({ status: 200, description: 'Retorna los datos del trabajador.' })
  @ApiResponse({ status: 404, description: 'Trabajador no encontrado.' })
  findOne(@Param('id') id: string) {
    // ...
  }
}