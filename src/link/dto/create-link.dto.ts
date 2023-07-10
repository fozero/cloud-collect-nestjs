import { IsString, IsNotEmpty } from 'class-validator';

/**
 * 请求参数验证
 */
export class CreateLinkDto {
  @IsString()
  @IsNotEmpty({ message: '请输入链接名称' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: '请输入链接地址' })
  readonly url: string;

  readonly tagIds: string;

  readonly categoryId: string;
}
