import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(dto: any): any;
    findAll(): {
        id: number;
        name: string;
        barcode: string;
        category: string;
        currentStock: number;
        minStock: number;
        shelf: number;
        aisleId: number;
    }[];
    findOne(id: string): {
        id: number;
        name: string;
        barcode: string;
        category: string;
        currentStock: number;
        minStock: number;
        shelf: number;
        aisleId: number;
    };
    update(id: string, dto: any): {
        id: number;
        name: string;
        barcode: string;
        category: string;
        currentStock: number;
        minStock: number;
        shelf: number;
        aisleId: number;
    };
    remove(id: string): {
        id: number;
        name: string;
        barcode: string;
        category: string;
        currentStock: number;
        minStock: number;
        shelf: number;
        aisleId: number;
    };
}
