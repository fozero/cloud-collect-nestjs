import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
// import { jwtConstants } from './constants';

// 注册JwtModule
// const jwtModule = JwtModule.register({
//   secret: jwtConstants.secret,
//   signOptions: { expiresIn: '60s' }, // 单位：120ms/60s/4h/7d
// });

// 异步方式注册JwtModule
const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '4h' }, // 设置token过期时间，单位：120ms/60s/4h/7d
    };
  },
});

@Module({
  imports: [jwtModule, PassportModule, UserModule],
  providers: [AuthService, JwtStrategy],
  exports: [jwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
