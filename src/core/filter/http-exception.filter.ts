import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

/**
 * 异常过滤器 异常返回统一响应
 * 捕获作为HttpException类实例的异常，并为它们设置自定义响应逻辑
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取请求上下文
    const ctx = host.switchToHttp();
    // 获取请求上下文中的 response对象
    const response = ctx.getResponse();
    // 获取异常状态码
    const status = exception.getStatus();

    let validMessage = '';
    // exceptionResponse返回结果格式： { message: [ '请输入链接名称' ], error: 'Bad Request', statusCode: 400 }
    // exceptionResponse {
    //   message: [ 'name must be a string', '请输入链接名称' ],
    //   error: 'Bad Request',
    //   statusCode: 400
    // }
    const exceptionResponse: any = exception.getResponse();
    // 考虑异常返回object类型的请求
    if (typeof exceptionResponse === 'object') {
      validMessage =
        typeof exceptionResponse.message === 'string'
          ? exceptionResponse.message
          : exceptionResponse.message[0];
    }

    // 异常消息
    const message = exception.message ? exception.message : 'Service Error';
    // Response.json()方法，使用 Response对象直接控制发送的响应。
    response.status(status).json({
      code: -1,
      message: validMessage || message,
      data: null,
    });
  }
}
