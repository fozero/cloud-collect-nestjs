import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { LinkEntity } from './link.entity';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [LinkController],
  providers: [LinkService],
  // 使用forFeature方法进行实体注册，这样，我们就可以使用 @InjectRepository()装饰器将 UsersRepository 注入到 UsersService 中
  imports: [TypeOrmModule.forFeature([LinkEntity]), TagModule, CategoryModule],
})
export class LinkModule {}
