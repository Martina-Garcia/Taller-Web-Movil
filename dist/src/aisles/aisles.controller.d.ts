import { AislesService } from './aisles.service';
import { CreateAisleDto } from './dto/create-aisle.dto';
export declare class AislesController {
    private readonly aislesService;
    constructor(aislesService: AislesService);
    create(dto: CreateAisleDto): Promise<{
        numero: number;
        nombre: string;
        categoria: string;
        estantes: number;
        color: string;
        estado: string;
        notas: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        numero: number;
        nombre: string;
        categoria: string;
        estantes: number;
        color: string;
        estado: string;
        notas: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: string): Promise<{
        numero: number;
        nombre: string;
        categoria: string;
        estantes: number;
        color: string;
        estado: string;
        notas: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: string, dto: any): Promise<{
        numero: number;
        nombre: string;
        categoria: string;
        estantes: number;
        color: string;
        estado: string;
        notas: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: string): Promise<{
        numero: number;
        nombre: string;
        categoria: string;
        estantes: number;
        color: string;
        estado: string;
        notas: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
