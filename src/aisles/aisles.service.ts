import { Injectable } from '@nestjs/common';
import { CreateAisleDto } from './dto/create-aisle.dto';
import { UpdateAisleDto } from './dto/update-aisle.dto';

@Injectable()
export class AislesService {
  create(createAisleDto: CreateAisleDto) {
    return 'This action adds a new aisle';
  }

  findAll() {
    return `This action returns all aisles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aisle`;
  }

  update(id: number, updateAisleDto: UpdateAisleDto) {
    return `This action updates a #${id} aisle`;
  }

  remove(id: number) {
    return `This action removes a #${id} aisle`;
  }
}
