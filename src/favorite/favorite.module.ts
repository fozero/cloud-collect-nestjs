import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Favorite } from './entities/favorite.entity';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [TypeOrmModule.forFeature([Favorite])],
  exports: [FavoriteService],
})
export class FavoriteModule {}
