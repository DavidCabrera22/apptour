import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de validación global
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de CORS para microservicio
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('AppTour API')
    .setDescription('API para sistema de turismo con autenticación JWT')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // Este nombre se usará en los decoradores
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Puerto dinámico para Railway/Docker
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(
    `📚 Documentación Swagger disponible en http://localhost:${port}/api`,
  );
}

bootstrap();
