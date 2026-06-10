import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(dto: CreateOrderDto): Promise<{
        num: string;
        cliente: string;
        tel: string | null;
        direccion: string | null;
        entrega: string;
        estado: string;
        fecha: string;
        items: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        pickerId: number | null;
    }>;
    findAll(): Promise<({
        picker: {
            tel: string | null;
            estado: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            nombre: string;
            rut: string;
            turno: string;
            rol: string;
            pedidosHoy: number;
            pedidoActual: string | null;
        } | null;
    } & {
        num: string;
        cliente: string;
        tel: string | null;
        direccion: string | null;
        entrega: string;
        estado: string;
        fecha: string;
        items: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        pickerId: number | null;
    })[]>;
    findOne(id: string): Promise<{
        picker: {
            tel: string | null;
            estado: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            nombre: string;
            rut: string;
            turno: string;
            rol: string;
            pedidosHoy: number;
            pedidoActual: string | null;
        } | null;
    } & {
        num: string;
        cliente: string;
        tel: string | null;
        direccion: string | null;
        entrega: string;
        estado: string;
        fecha: string;
        items: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        pickerId: number | null;
    }>;
    update(id: string, dto: any): Promise<{
        num: string;
        cliente: string;
        tel: string | null;
        direccion: string | null;
        entrega: string;
        estado: string;
        fecha: string;
        items: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        pickerId: number | null;
    }>;
    remove(id: string): Promise<{
        num: string;
        cliente: string;
        tel: string | null;
        direccion: string | null;
        entrega: string;
        estado: string;
        fecha: string;
        items: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        pickerId: number | null;
    }>;
}
