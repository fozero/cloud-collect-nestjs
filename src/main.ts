import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

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

  // 为cookie注册全局中间件
  app.use(cookieParser());
  // 启用cors跨域
  app.enableCors({
    // origin，支持Boolean、string、RegExp、Array、Function等类型，具体使用查看https://github.com/expressjs/cors#configuration-options
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    // 允许cookie
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
