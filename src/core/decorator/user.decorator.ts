import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // cookie中获取token
    let token = null;
    if (request?.cookies) {
      token = request.cookies['token'];
    }

    // const payload = await this.jwtService.verifyAsync(token, {
    //   secret: jwtConstants.secret,
    // });

    console.log('request--', request);

    return {
      nickname: 'kerry',
    };
  },
);
