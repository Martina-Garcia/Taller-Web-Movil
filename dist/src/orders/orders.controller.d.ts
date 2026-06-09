import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    create(createOrderDto: CreateOrderDto): void;
    assignToWorker(id: string, workerId: string): void;
}
