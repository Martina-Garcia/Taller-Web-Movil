export declare class ProductsService {
    private products;
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
    findOne(id: number): {
        id: number;
        name: string;
        barcode: string;
        category: string;
        currentStock: number;
        minStock: number;
        shelf: number;
        aisleId: number;
    };
    update(id: number, dto: any): {
        id: number;
        name: string;
        barcode: string;
        category: string;
        currentStock: number;
        minStock: number;
        shelf: number;
        aisleId: number;
    };
    remove(id: number): {
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
