import { PrismaService } from '../prisma/prisma.service';
export declare class AislesService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
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
    update(id: number, dto: any): Promise<{
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
    remove(id: number): Promise<{
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
