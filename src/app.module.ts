import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AislesModule } from './aisles/aisles.module';
import { WorkersModule } from './workers/workers.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
 
@Module({
  imports: [PrismaModule, ProductsModule, AislesModule, WorkersModule, OrdersModule],
})
export class AppModule {}