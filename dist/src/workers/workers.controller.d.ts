import { WorkersService } from './workers.service';
export declare class WorkersController {
    private readonly workersService;
    constructor(workersService: WorkersService);
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: any): Promise<{
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
    remove(id: string): Promise<{
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
