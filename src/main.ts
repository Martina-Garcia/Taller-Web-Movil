import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PickMart API — Sistema de Picking')
    .setDescription('Endpoints para la gestión de inventario, pasillos, trabajadores y órdenes.')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();

  await app.listen(3000);
  console.log('Servidor backend corriendo en http://localhost:3000');
  console.log('Documentación interactiva en http://localhost:3000/api/docs');
}
bootstrap();