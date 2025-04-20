import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavoriteFolderDto } from './dto/create-favorite-folder.dto';
import { UpdateFavoriteFolderDto } from './dto/update-favorite-folder.dto';

import { FavoriteFolder } from './entities/favorite-folder.entity';

@Injectable()
export class FavoriteFolderService {
  constructor(
    // 通过InjectRepository装饰器将CollectionRepository注入到collectionService 中
    @InjectRepository(FavoriteFolder)
    private favoriteFolderRepository: Repository<FavoriteFolder>,
  ) {}

  async create(
    userId: string,
    createFavoriteFolderDto: CreateFavoriteFolderDto,
  ) {
    return await this.favoriteFolderRepository.save(
      this.favoriteFolderRepository.create({
        ...createFavoriteFolderDto,
        userId,
      }),
    );
  }

  /**
   * 获取用户全部收藏夹
   * @param userId
   * @returns
   */
  async findAllByUserId(userId: string) {
    return await this.favoriteFolderRepository.find({
      where: {
        userId,
      },
    });
  }

  async findAll(page: number, limit: number) {
    // return await this.favoriteFolderRepository.find();
    // return await this.favoriteFolderRepository
    //   .createQueryBuilder('favoriteFolder')
    //   .getMany();

    const qb = await this.favoriteFolderRepository.createQueryBuilder(
      'favoriteFolder',
    );

    // 降序排序
    qb.orderBy('favoriteFolder.updatedAt', 'DESC'); // DESC ASC

    qb.skip((page - 1) * limit);
    qb.take(limit);
    const [favoritesFolders, counts] = await qb.getManyAndCount(); // 同时返回总条数

    return {
      page,
      limit,
      list: favoritesFolders,
      total: counts,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} favoriteFolder`;
  }

  update(id: number, updateFavoriteFolderDto: UpdateFavoriteFolderDto) {
    return `This action updates a #${id} favoriteFolder`;
  }

  remove(id: number) {
    return `This action removes a #${id} favoriteFolder`;
  }
}
