import { PrismaService } from '../prisma/prisma.service';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): Promise<{
        items: import("@prisma/client/runtime/library").JsonValue;
        id: number;
        tel: string | null;
        estado: string;
        createdAt: Date;
        updatedAt: Date;
        num: string;
        cliente: string;
        direccion: string | null;
        entrega: string;
        fecha: string;
        pickerId: number | null;
    }>;
    findAll(): Promise<({
        picker: {
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
        } | null;
    } & {
        items: import("@prisma/client/runtime/library").JsonValue;
        id: number;
        tel: string | null;
        estado: string;
        createdAt: Date;
        updatedAt: Date;
        num: string;
        cliente: string;
        direccion: string | null;
        entrega: string;
        fecha: string;
        pickerId: number | null;
    })[]>;
    findOne(id: number): Promise<{
        picker: {
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
        } | null;
    } & {
        items: import("@prisma/client/runtime/library").JsonValue;
        id: number;
        tel: string | null;
        estado: string;
        createdAt: Date;
        updatedAt: Date;
        num: string;
        cliente: string;
        direccion: string | null;
        entrega: string;
        fecha: string;
        pickerId: number | null;
    }>;
    update(id: number, dto: any): Promise<{
        items: import("@prisma/client/runtime/library").JsonValue;
        id: number;
        tel: string | null;
        estado: string;
        createdAt: Date;
        updatedAt: Date;
        num: string;
        cliente: string;
        direccion: string | null;
        entrega: string;
        fecha: string;
        pickerId: number | null;
    }>;
    remove(id: number): Promise<{
        items: import("@prisma/client/runtime/library").JsonValue;
        id: number;
        tel: string | null;
        estado: string;
        createdAt: Date;
        updatedAt: Date;
        num: string;
        cliente: string;
        direccion: string | null;
        entrega: string;
        fecha: string;
        pickerId: number | null;
    }>;
}
