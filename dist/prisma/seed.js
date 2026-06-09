"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    await prisma.order.deleteMany();
    await prisma.worker.deleteMany();
    await prisma.product.deleteMany();
    await prisma.aisle.deleteMany();
    await prisma.aisle.createMany({
        data: [
            { numero: 1, nombre: 'Lácteos y Huevos', categoria: 'Lácteos', estantes: 5, color: '#52b788', estado: 'Activo', notas: 'Refrigerado. Revisar temperatura.' },
            { numero: 2, nombre: 'Bebidas y Jugos', categoria: 'Bebidas', estantes: 6, color: '#2b6cb0', estado: 'Activo', notas: '' },
            { numero: 3, nombre: 'Panadería y Cereales', categoria: 'Panadería', estantes: 4, color: '#c68642', estado: 'Activo', notas: 'Productos de alta rotación.' },
            { numero: 4, nombre: 'Carnes y Embutidos', categoria: 'Carnes', estantes: 3, color: '#c0392b', estado: 'Activo', notas: 'Zona refrigerada.' },
            { numero: 5, nombre: 'Frutas y Verduras', categoria: 'Frutas y Verduras', estantes: 4, color: '#74c442', estado: 'Activo', notas: 'Sección de pesaje.' },
            { numero: 6, nombre: 'Limpieza y Aseo', categoria: 'Limpieza', estantes: 5, color: '#9b59b6', estado: 'Activo', notas: '' },
            { numero: 7, nombre: 'Snacks y Confites', categoria: 'Snacks', estantes: 4, color: '#e07b39', estado: 'En Reposición', notas: 'Faltan productos en estante B.' },
            { numero: 8, nombre: 'Congelados', categoria: 'Congelados', estantes: 3, color: '#1a7abf', estado: 'Activo', notas: '' },
        ],
    });
    await prisma.product.createMany({
        data: [
            { codigo: '780000100001', nombre: 'Leche Entera 1L', categoria: 'Lácteos', marca: 'Colun', pasillo: 1, estante: 'A1', stock: 24, stockMin: 10, unidad: 'un', estado: 'Activo' },
            { codigo: '780000100002', nombre: 'Yogurt Natural 180g', categoria: 'Lácteos', marca: 'Soprole', pasillo: 1, estante: 'A2', stock: 15, stockMin: 8, unidad: 'un', estado: 'Activo' },
            { codigo: '780000100003', nombre: 'Queso Gouda 200g', categoria: 'Lácteos', marca: 'Colun', pasillo: 1, estante: 'B1', stock: 3, stockMin: 6, unidad: 'un', estado: 'Sin Stock' },
            { codigo: '780000100004', nombre: 'Jugo de Naranja 1L', categoria: 'Bebidas', marca: "Watt's", pasillo: 2, estante: 'A1', stock: 30, stockMin: 12, unidad: 'un', estado: 'Activo' },
            { codigo: '780000100005', nombre: 'Agua Mineral 1.5L', categoria: 'Bebidas', marca: 'Cachantun', pasillo: 2, estante: 'B2', stock: 50, stockMin: 20, unidad: 'un', estado: 'Activo' },
            { codigo: '780000100006', nombre: 'Coca-Cola 2L', categoria: 'Bebidas', marca: 'Coca-Cola', pasillo: 2, estante: 'C1', stock: 18, stockMin: 10, unidad: 'un', estado: 'Activo' },
            { codigo: '780000100007', nombre: 'Pan Molde Integral', categoria: 'Panadería', marca: 'Ideal', pasillo: 3, estante: 'A1', stock: 7, stockMin: 6, unidad: 'un', estado: 'Activo' },
            { codigo: '780000100008', nombre: 'Avena 500g', categoria: 'Panadería', marca: 'Quaker', pasillo: 3, estante: 'B3', stock: 12, stockMin: 8, unidad: 'un', estado: 'Activo' },
            { codigo: '780000100009', nombre: 'Pollo Entero kg', categoria: 'Carnes', marca: 'Agrosuper', pasillo: 4, estante: 'A1', stock: 0, stockMin: 4, unidad: 'kg', estado: 'Sin Stock' },
            { codigo: '780000100010', nombre: 'Tomate kg', categoria: 'Frutas y Verduras', marca: '', pasillo: 5, estante: 'A2', stock: 8, stockMin: 5, unidad: 'kg', estado: 'Activo' },
            { codigo: '780000100011', nombre: 'Detergente Líquido 3L', categoria: 'Limpieza', marca: 'Omo', pasillo: 6, estante: 'C2', stock: 9, stockMin: 6, unidad: 'un', estado: 'Activo' },
            { codigo: '780000100012', nombre: 'Papas Fritas 200g', categoria: 'Snacks', marca: 'Lays', pasillo: 7, estante: 'A1', stock: 22, stockMin: 10, unidad: 'un', estado: 'Activo' },
            { codigo: '780000100013', nombre: 'Helado Vainilla 1L', categoria: 'Congelados', marca: 'Bresler', pasillo: 8, estante: 'A1', stock: 4, stockMin: 4, unidad: 'un', estado: 'Activo' },
            { codigo: '780000100014', nombre: 'Mantequilla 200g', categoria: 'Lácteos', marca: 'Colun', pasillo: 1, estante: 'C1', stock: 2, stockMin: 5, unidad: 'un', estado: 'Sin Stock' },
            { codigo: '780000100015', nombre: 'Fideos Tallarines 400g', categoria: 'Panadería', marca: 'Carozzi', pasillo: 3, estante: 'D2', stock: 20, stockMin: 8, unidad: 'un', estado: 'Activo' },
        ],
    });
    await prisma.worker.createMany({
        data: [
            { nombre: 'Carlos Martínez', rut: '12.345.678-9', turno: 'Turno A (08:00-16:00)', rol: 'Picker', tel: '+56 9 8765 4321', estado: 'Activo', pedidosHoy: 5, pedidoActual: '#P-2024' },
            { nombre: 'Ana Rodríguez', rut: '13.456.789-0', turno: 'Turno A (08:00-16:00)', rol: 'Picker', tel: '+56 9 7654 3210', estado: 'Activo', pedidosHoy: 4, pedidoActual: '#P-2025' },
            { nombre: 'Jorge Pérez', rut: '14.567.890-1', turno: 'Turno B (16:00-00:00)', rol: 'Supervisor', tel: '+56 9 6543 2109', estado: 'Activo', pedidosHoy: 0, pedidoActual: null },
            { nombre: 'Valentina López', rut: '15.678.901-2', turno: 'Turno A (08:00-16:00)', rol: 'Picker', tel: '+56 9 5432 1098', estado: 'Vacaciones', pedidosHoy: 0, pedidoActual: null },
            { nombre: 'Diego Soto', rut: '16.789.012-3', turno: 'Turno B (16:00-00:00)', rol: 'Picker', tel: '+56 9 4321 0987', estado: 'Activo', pedidosHoy: 3, pedidoActual: null },
        ],
    });
    const workers = await prisma.worker.findMany({ orderBy: { id: 'asc' } });
    await prisma.order.createMany({
        data: [
            { num: 'P-2020', cliente: 'Benjamin Bustamante', tel: '+56 9 1234 5678', direccion: 'Av. Providencia 1234, Dpto 5', entrega: 'Despacho a domicilio', pickerId: workers[0].id, estado: 'Completado', fecha: '2026-04-20', items: [{ prodId: 1, qty: 2 }, { prodId: 4, qty: 3 }] },
            { num: 'P-2021', cliente: 'Abraham Sepulveda', tel: '+56 9 2345 6789', direccion: '', entrega: 'Retiro en tienda', pickerId: workers[1].id, estado: 'Completado', fecha: '2026-04-20', items: [{ prodId: 5, qty: 6 }, { prodId: 8, qty: 2 }] },
            { num: 'P-2022', cliente: 'Joaquin Carrasco', tel: '+56 9 3456 7890', direccion: 'Los Leones 567, Las Condes', entrega: 'Despacho a domicilio', pickerId: workers[0].id, estado: 'Completado', fecha: '2026-04-20', items: [{ prodId: 2, qty: 2 }, { prodId: 10, qty: 1 }] },
            { num: 'P-2023', cliente: 'Martina Garcia', tel: '+56 9 4567 8901', direccion: '', entrega: 'Retiro en tienda', pickerId: workers[1].id, estado: 'Completado', fecha: '2026-04-20', items: [{ prodId: 13, qty: 2 }] },
            { num: 'P-2024', cliente: 'Isabel Reyes', tel: '+56 9 5678 9012', direccion: 'Ñuñoa, Los Militares 45', entrega: 'Despacho a domicilio', pickerId: workers[0].id, estado: 'En Proceso', fecha: '2026-04-20', items: [{ prodId: 1, qty: 1 }, { prodId: 2, qty: 2 }] },
            { num: 'P-2025', cliente: 'Andrés Castro', tel: '+56 9 6789 0123', direccion: 'Maipú Centro 800', entrega: 'Despacho a domicilio', pickerId: workers[1].id, estado: 'En Proceso', fecha: '2026-04-20', items: [{ prodId: 4, qty: 4 }] },
            { num: 'P-2026', cliente: 'Sofía Herrera', tel: '+56 9 7890 1234', direccion: '', entrega: 'Retiro en tienda', pickerId: workers[4].id, estado: 'Pendiente', fecha: '2026-04-20', items: [{ prodId: 6, qty: 2 }] },
            { num: 'P-2027', cliente: 'Nicolás Vargas', tel: '+56 9 8901 2345', direccion: 'Vitacura Norte 212', entrega: 'Despacho a domicilio', pickerId: workers[4].id, estado: 'Pendiente', fecha: '2026-04-20', items: [{ prodId: 1, qty: 3 }] },
            { num: 'P-2028', cliente: 'Camila Espinoza', tel: '+56 9 9012 3456', direccion: '', entrega: 'Retiro en tienda', pickerId: workers[4].id, estado: 'Pendiente', fecha: '2026-04-20', items: [{ prodId: 2, qty: 1 }] },
        ],
    });
    console.log('✅ Seed completado');
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map