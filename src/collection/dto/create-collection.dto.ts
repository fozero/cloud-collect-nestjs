import { IsNotEmpty } from 'class-validator';
export class CreateCollectionDto {
  @IsNotEmpty({ message: '收藏夹名称不能为空' })
  name: string;

  description: string;

  @IsNotEmpty({ message: '选择项不能为空' })
  isPublic: number;
}
