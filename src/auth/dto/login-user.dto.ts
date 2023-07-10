import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: '请输入用户名' })
  username: string;

  @IsNotEmpty({ message: '请输入密码' })
  password: string;
}
