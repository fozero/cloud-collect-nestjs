import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { jwtConstants } from './constants';

/**
 * 实现jwt策略
 * 对于 JWT 策略，Passport 首先验证 JWT 的签名并解码 JSON 。然后调用我们的 validate() 方法，该方法将解码后的 JSON 作为其单个参数传递
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // 提供从请求中提取 JWT 的方法。
      // jwtFromRequest，接受请求作为唯一参数并返回 JWT 作为字符串或 null 的函数
      // 获取token的2种方式
      // 1.从cookie中获取token
      jwtFromRequest: (req) => {
        let token = null;
        if (req?.cookies) {
          token = req.cookies['token'];
        }
        return token;
      },
      // 2.从header中获取token
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 选择默认的 false 设置，它将确保 JWT 没有过期的责任委托给 Passport 模块。这意味着，如果我们的路由提供了一个过期的 JWT ，请求将被拒绝，并发送 401 Unauthorized 的响应。
      ignoreExpiration: false,
      // 密钥，不要暴露出去
      secretOrKey: configService.get('JWT_SECRET'),
      //   secretOrKey: jwtConstants.secret,
    } as StrategyOptions);
  }

  // payload {
  //     userId: '4d8b498e-b743-46e4-bdf8-91c25212441b',
  //     username: 'kerrywu',
  //     iat: 1688724765,
  //     exp: 1688739165
  //   }
  async validate(payload: any) {
    // TODO 是否需要查询确认该用户是否存在
    return { userId: payload.userId, username: payload.username };
  }
}
