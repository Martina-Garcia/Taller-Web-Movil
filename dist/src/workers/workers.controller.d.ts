import { CreateWorkerDto } from './dto/create-worker.dto';
export declare class WorkersController {
    create(createWorkerDto: CreateWorkerDto): void;
    findAll(): void;
    findOne(id: string): void;
}
