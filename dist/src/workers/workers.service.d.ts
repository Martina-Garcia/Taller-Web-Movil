import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
export declare class WorkersService {
    create(createWorkerDto: CreateWorkerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateWorkerDto: UpdateWorkerDto): string;
    remove(id: number): string;
}
