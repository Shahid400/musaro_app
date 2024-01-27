import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { extractErrorMessages } from '@shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  /* CORS Configuration */
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        /* Un-expected error handling */
        let errors: null | string[] = null;
        validationErrors.forEach((error) => {
          const errMessages = extractErrorMessages(error);
          if (errMessages.length) {
            errors = !errors?.length
              ? [...errMessages]
              : [...errors, ...errMessages];
          }
        });
        return new BadRequestException(errors);
      },
    }),
  );

  const documentConfig = new DocumentBuilder()
    .setTitle('Musaro App')
    .setDescription('API documentation for APP')
    .addBearerAuth()
    .setVersion('1.0')
    .setExternalDoc('Postman Collection', '/api-json')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);
  const port = config.get('PORT') || 8000;
  await app.listen(port);
}
bootstrap();
