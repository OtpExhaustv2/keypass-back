import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { NotFoundExceptionFilter } from './utils/filters';
import { NumberParamsCastingInterceptor } from './utils/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new NumberParamsCastingInterceptor());
  app.use(passport.initialize());
  await app.listen(5000);
}
bootstrap();
