-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "marca" TEXT,
    "pasillo" INTEGER NOT NULL,
    "estante" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "stockMin" INTEGER NOT NULL DEFAULT 0,
    "unidad" TEXT NOT NULL DEFAULT 'un',
    "estado" TEXT NOT NULL DEFAULT 'Activo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aisles" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "estantes" INTEGER NOT NULL DEFAULT 4,
    "color" TEXT NOT NULL DEFAULT '#52b788',
    "estado" TEXT NOT NULL DEFAULT 'Activo',
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aisles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workers" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "tel" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'Activo',
    "pedidosHoy" INTEGER NOT NULL DEFAULT 0,
    "pedidoActual" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "num" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "tel" TEXT,
    "direccion" TEXT,
    "entrega" TEXT NOT NULL,
    "pickerId" INTEGER,
    "estado" TEXT NOT NULL DEFAULT 'Pendiente',
    "fecha" TEXT NOT NULL,
    "items" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_codigo_key" ON "products"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "aisles_numero_key" ON "aisles"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "workers_rut_key" ON "workers"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "orders_num_key" ON "orders"("num");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_pickerId_fkey" FOREIGN KEY ("pickerId") REFERENCES "workers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
