import { IsNotEmpty } from 'class-validator';
export class CreateFavoriteDto {
  @IsNotEmpty({ message: '名称不能为空' })
  name: string;

  description: string;

  @IsNotEmpty({ message: '链接不能为空' })
  url: string;

  @IsNotEmpty({ message: '收藏夹id不能为空' })
  favoriteFolderId: string;

  platformName: string;
}
