import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AislesService } from './aisles.service';
import { CreateAisleDto } from './dto/create-aisle.dto';
import { UpdateAisleDto } from './dto/update-aisle.dto';

@Controller('aisles')
export class AislesController {
  constructor(private readonly aislesService: AislesService) {}

  @Post()
  create(@Body() createAisleDto: CreateAisleDto) {
    return this.aislesService.create(createAisleDto);
  }

  @Get()
  findAll() {
    return this.aislesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aislesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAisleDto: UpdateAisleDto) {
    return this.aislesService.update(+id, updateAisleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aislesService.remove(+id);
  }
}
