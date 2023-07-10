import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePwd, encryptPwd } from '../utils/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 用户登录
   * @param createUserDto
   * @returns
   */
  async login(loginUserDto: LoginUserDto) {
    const existUser = await this.validateUser(loginUserDto);
    const token = this.createToken(existUser);
    return {
      userId: existUser.userId,
      token,
    };
  }

  /**
   * 用户注册
   * @param createUserDto
   * @returns
   */
  async register(createUserDto: CreateUserDto) {
    const { username, password, nickname } = createUserDto;
    const existUser = await this.userService.findByUsername(username);
    if (existUser) {
      throw new BadRequestException('注册用户已存在');
    }

    const user = {
      ...createUserDto,
      nickname: nickname ? nickname : `u_${username}`, // 自动生成昵称
      password: encryptPwd(password), // 保存加密后的密码
    };

    return await this.userService.create(user);
  }

  /**
   * 校验登录用户
   * @param user
   * @returns
   */
  async validateUser(user) {
    const { username, password } = user;
    const existUser = await this.userService.findByUsername(username);
    if (!existUser) {
      throw new BadRequestException('用户不存在');
    }
    const { password: encryptPwd } = existUser;
    const isOk = comparePwd(password, encryptPwd);
    if (!isOk) {
      throw new BadRequestException('登录密码错误');
    }
    return existUser;
  }

  /**
   * 创建token
   * @param user
   * @returns
   */
  createToken(user) {
    const payload = {
      userId: user.userId,
      username: user.username,
    };
    return this.jwtService.sign(payload);
  }
}
