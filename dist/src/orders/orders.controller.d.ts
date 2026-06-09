import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: any): Promise<{
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
    remove(id: string): Promise<{
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
