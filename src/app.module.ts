import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { AislesModule } from './aisles/aisles.module';
import { WorkersModule } from './workers/workers.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [PrismaModule, ProductsModule, AislesModule, WorkersModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
