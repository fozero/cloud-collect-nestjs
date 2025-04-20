import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkModule } from './link/link.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { CollectionModule } from './collection/collection.module';
import { FavoriteModule } from './favorite/favorite.module';
import { FavoriteFolderModule } from './favorite-folder/favorite-folder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      //全局使用，无需在其他模块中导入它
      isGlobal: true,
      // 自定义 env 文件路径，默认情况下，程序在应用程序的根目录中查找.env文件
      envFilePath: ['.env'],
    }),
    // 异步配置
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // 自动载入实体
        autoLoadEntities: true,
        // 默认：false，如果为true，自动载入的模型将同步，禁止生产环境使用，否则数据将会丢失
        synchronize: true,
        // 打印原始sql
        // logging: true,
        logging: ['query', 'error'],
      }),
    }),
    LinkModule,
    UserModule,
    AuthModule,
    TagModule,
    CategoryModule,
    PostModule,
    CollectionModule,
    FavoriteModule,
    FavoriteFolderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
