import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { FavoriteModule } from '../favorite/favorite.module';
import { FavoriteFolderModule } from '../favorite-folder/favorite-folder.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    FavoriteModule,
    FavoriteFolderModule,
  ],
  // 要在其他模块中使用该模块的服务，需导出该服务
  exports: [UserService],
})
export class UserModule {}
