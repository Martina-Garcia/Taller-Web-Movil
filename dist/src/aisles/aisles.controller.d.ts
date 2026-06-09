import { AislesService } from './aisles.service';
export declare class AislesController {
    private readonly aislesService;
    constructor(aislesService: AislesService);
    create(dto: any): Promise<{
        id: number;
        nombre: string;
        estado: string;
        createdAt: Date;
        updatedAt: Date;
        categoria: string;
        numero: number;
        estantes: number;
        color: string;
        notas: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        nombre: string;
        estado: string;
        createdAt: Date;
        updatedAt: Date;
        categoria: string;
        numero: number;
        estantes: number;
        color: string;
        notas: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        nombre: string;
        estado: string;
        createdAt: Date;
        updatedAt: Date;
        categoria: string;
        numero: number;
        estantes: number;
        color: string;
        notas: string | null;
    }>;
    update(id: string, dto: any): Promise<{
        id: number;
        nombre: string;
        estado: string;
        createdAt: Date;
        updatedAt: Date;
        categoria: string;
        numero: number;
        estantes: number;
        color: string;
        notas: string | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        nombre: string;
        estado: string;
        createdAt: Date;
        updatedAt: Date;
        categoria: string;
        numero: number;
        estantes: number;
        color: string;
        notas: string | null;
    }>;
}
