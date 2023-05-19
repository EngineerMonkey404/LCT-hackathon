import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ credentials: true });
  app.use(cookieParser(process.env.SECRET));
  const swagger_config = new DocumentBuilder()
    .setTitle('Хакатон')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Хакатон')
    .build();
  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT);
}
bootstrap();
