import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局注册异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册验证管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
