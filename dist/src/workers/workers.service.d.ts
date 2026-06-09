import { PrismaService } from '../prisma/prisma.service';
export declare class WorkersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): Promise<{
        id: number;
        nombre: string;
        rut: string;
        turno: string;
        rol: string;
        tel: string | null;
        estado: string;
        pedidosHoy: number;
        pedidoActual: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        nombre: string;
        rut: string;
        turno: string;
        rol: string;
        tel: string | null;
        estado: string;
        pedidosHoy: number;
        pedidoActual: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nombre: string;
        rut: string;
        turno: string;
        rol: string;
        tel: string | null;
        estado: string;
        pedidosHoy: number;
        pedidoActual: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: any): Promise<{
        id: number;
        nombre: string;
        rut: string;
        turno: string;
        rol: string;
        tel: string | null;
        estado: string;
        pedidosHoy: number;
        pedidoActual: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        rut: string;
        turno: string;
        rol: string;
        tel: string | null;
        estado: string;
        pedidosHoy: number;
        pedidoActual: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
