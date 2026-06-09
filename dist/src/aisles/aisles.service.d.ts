import { CreateAisleDto } from './dto/create-aisle.dto';
import { UpdateAisleDto } from './dto/update-aisle.dto';
export declare class AislesService {
    create(createAisleDto: CreateAisleDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAisleDto: UpdateAisleDto): string;
    remove(id: number): string;
}
