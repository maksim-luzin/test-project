import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './enums/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env[Config.AppPort] || 3000;

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Test')
    .setDescription('Test api documentation')
    .setVersion('1.0.0')
    .addTag('test')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);

  await app.listen(port);
}

bootstrap();
