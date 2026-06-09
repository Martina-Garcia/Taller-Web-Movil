import { CreateAisleDto } from './dto/create-aisle.dto';
export declare class AislesController {
    create(createAisleDto: CreateAisleDto): void;
    getLocationsByAisle(id: string): void;
}
