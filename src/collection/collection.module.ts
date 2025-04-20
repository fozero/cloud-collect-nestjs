import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { Collection } from './entities/collection.entity';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService],
  // 实体注册
  imports: [TypeOrmModule.forFeature([Collection])],
})
export class CollectionModule {}
