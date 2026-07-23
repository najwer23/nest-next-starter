import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const port = parseInt(process.env.PORT ?? '3001', 10);

  const corsAllowedOrigins = process.env.CORS_ALLOWED_ORIGINS;

  if (!corsAllowedOrigins) {
    throw new Error('CORS_ALLOWED_ORIGINS env variable is required');
  }

  const app = await NestFactory.create(AppModule, {});

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.enableCors({
    origin: corsAllowedOrigins.split(',').map((o) => o.trim()),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Api NestJS')
    .setDescription('REST API for NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
}

bootstrap();
