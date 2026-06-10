import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
export declare class WorkersController {
    private readonly workersService;
    constructor(workersService: WorkersService);
    create(dto: CreateWorkerDto): Promise<{
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
        id: number;
    }>;
    findAll(): Promise<{
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
        id: number;
    }[]>;
    findOne(id: string): Promise<{
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
        id: number;
    }>;
    update(id: string, dto: any): Promise<{
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
        id: number;
    }>;
    remove(id: string): Promise<{
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
        id: number;
    }>;
}
