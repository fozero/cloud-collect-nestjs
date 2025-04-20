import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async create(userId: string, createFavoriteDto: CreateFavoriteDto) {
    return await this.favoriteRepository.save(
      this.favoriteRepository.create({
        ...createFavoriteDto,
        userId,
      }),
    );
  }

  // findAll() {
  //   return `This action returns all favorite`;
  // }

  /**
   * 根据收藏夹id获取收藏列表
   * @param favoriteFolderId 收藏夹id
   */
  async findAll({
    page,
    limit,
    userId,
    favoriteFolderId,
  }: {
    page: number;
    limit: number;
    userId?: string;
    favoriteFolderId?: string;
  }) {
    console.log('pagelimit', page, limit);

    // const condition: any = {};
    // if (favoriteFolderId) {
    //   condition.favoriteFolderId = favoriteFolderId;
    // }
    // return await this.favoriteRepository.find({
    //   where: condition,
    // });

    const qb = await this.favoriteRepository.createQueryBuilder('favorite');

    // 条件查询--文件夹id
    if (favoriteFolderId) {
      qb.where('favorite.favoriteFolderId = :favoriteFolderId', {
        favoriteFolderId,
      });
    }

    // 条件查询--用户id
    if (userId) {
      qb.where('favorite.userId = :userId', { userId });
    }

    // 降序排序
    qb.orderBy('favorite.updatedAt', 'DESC'); // DESC ASC

    qb.skip((page - 1) * limit);
    qb.take(limit);
    await qb.getManyAndCount();
    const [favorites, counts] = await qb.getManyAndCount(); // 同时返回总条数

    return {
      page,
      limit,
      list: favorites,
      total: counts,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
