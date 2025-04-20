import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteFolderService } from './favorite-folder.service';
import { FavoriteFolderController } from './favorite-folder.controller';
import { FavoriteFolder } from './entities/favorite-folder.entity';

@Module({
  controllers: [FavoriteFolderController],
  providers: [FavoriteFolderService],
  // 实体注册
  imports: [TypeOrmModule.forFeature([FavoriteFolder])],
  exports: [FavoriteFolderService],
})
export class FavoriteFolderModule {}
