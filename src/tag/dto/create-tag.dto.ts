import { IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty({ message: '标签名称不能为空' })
  name: string;
}
