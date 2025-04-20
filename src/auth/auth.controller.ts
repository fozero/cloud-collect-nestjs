import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * 授权认证相关模块，包括用户注册、用户登录、用户认证、注销、修改密码等功能
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res, // 将响应处理逻辑留给框架，需要将该passthrough选项设置为true
  ) {
    const token = await this.authService.login(loginUserDto);
    // 将token设置到cookie中
    res.cookie('token', token);
    return token;
  }

  // 对请求标记ClassSerializerInterceptor，此时过滤掉password字段
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // 检查用户是否已登录
  @UseGuards(AuthGuard('jwt'))
  @Post('/checkLogin')
  async checkLogin() {
    return {
      isLoggedIn: true,
    };
  }
}
