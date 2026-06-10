declare class OrderItemDto {
    prodId: number;
    qty: number;
}
export declare class CreateOrderDto {
    num: string;
    cliente: string;
    tel: string;
    direccion: string;
    entrega: string;
    pickerId: number;
    estado: string;
    fecha: string;
    items: OrderItemDto[];
}
export {};
