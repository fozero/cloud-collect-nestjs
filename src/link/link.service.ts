import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like } from 'typeorm';
import * as lodash from 'lodash';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinkEntity } from './link.entity';
import { TagService } from '../tag/tag.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private linksRepository: Repository<LinkEntity>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
  ) {}

  // /**
  //  * 创建链接
  //  * @param userId
  //  * @param createLinkDto
  //  * @returns
  //  */
  // async create(userId: string, createLinkDto: CreateLinkDto) {
  //   const { categoryId } = createLinkDto;
  //   // link和category是多对一的关系，这里保存的是category的实例
  //   const category = await this.categoryService.findOne(categoryId);
  //   const link = await this.linksRepository.create({
  //     ...createLinkDto,
  //     category,
  //     userId,
  //   });
  //   // 保存给定实体或实体数组。如果该实体已存在于数据库中，则会更新该实体。如果数据库中不存在该实体，则会插入该实体。
  //   return await this.linksRepository.save(link);
  // }

  /**
   * 创建链接
   * @param userId
   * @param createLinkDto
   * @returns
   */
  async create(userId: string, createLinkDto: CreateLinkDto) {
    // this.linksRepository.create 相当于 const link = new LinkEntity();
    const link = await this.linksRepository.create({
      ...createLinkDto,
      userId,
    });

    // 保存给定实体或实体数组。如果该实体已存在于数据库中，则会更新该实体。如果数据库中不存在该实体，则会插入该实体。
    return await this.linksRepository.save(link);
  }

  // skip: 5,  偏移（分页）
  // take: 10, limit (分页)
  /**
   * 分页查询列表  查询方式1：使用封装好的api
   * @param page
   * @param limit
   * @returns
   */
  // async findAll(
  //   page: number,
  //   limit: number,
  //   categoryId: string,
  //   tagId: string,
  // ) {
  //   const condition: any = {};

  //   // 条件查询--分类
  //   if (categoryId) {
  //     condition.category = {
  //       id: categoryId,
  //     };
  //   }
  //   // 条件模糊查询--标签id
  //   if (tagId) {
  //     condition.tagIds = Like(`%${tagId}%`);
  //   }

  //   const [links, counts] = await this.linksRepository.findAndCount({
  //     relations: ['category', 'user'], // 指定查询关系 relations: ['category'],
  //     where: condition,
  //     skip: (page - 1) * limit,
  //     take: limit,
  //   });

  //   // 拿到标签ids后查询标签数据并添加到数组对象中
  //   for (let i = 0; i < links.length; i++) {
  //     const { tagIds } = links[i];
  //     const tagIdsArr = lodash.split(tagIds, ',');
  //     const tags = await this.tagService.findByIds(tagIdsArr);
  //     links[i]['tags'] = tags;
  //   }
  //   return {
  //     page,
  //     limit,
  //     list: links,
  //     total: counts,
  //   };
  // }

  /**
   * 分页查询列表 查询方式2：使用QueryBuilder查询生成器
   * skip: 5,  偏移（分页）、take: 10, limit (分页)
   */
  async findAll(
    page: number,
    limit: number,
    categoryId: string,
    tagId: string,
  ) {
    const qb = await this.linksRepository
      .createQueryBuilder('link')
      .leftJoin('link.category', 'category')
      .leftJoin('link.user', 'user')
      .addSelect(['category.id', 'category.name'])
      .addSelect(['user.userId', 'user.nickname']);

    // 条件查询--分类
    if (categoryId) {
      qb.where('link.categoryId = :categoryId', { categoryId });
    }

    // 条件模糊查询--标签id
    if (tagId) {
      qb.where('link.tagIds Like :tagId', { tagId: `%${tagId}%` });
    }

    // 降序排序
    qb.orderBy('link.updatedAt', 'DESC'); // DESC ASC

    qb.skip((page - 1) * limit);
    qb.take(limit);
    const [links, counts] = await qb.getManyAndCount(); // 同时返回总条数

    // 拿到标签ids后查询标签数据并添加到数组对象中
    for (let i = 0; i < links.length; i++) {
      const { tagIds } = links[i];
      const tagIdsArr = lodash.split(tagIds, ',');
      const tags = await this.tagService.findByIds(tagIdsArr);
      // 返回部分字段
      const newTags = tags.map((tag) => {
        const { id, name } = tag;
        return {
          id,
          name,
        };
      });
      links[i]['tags'] = newTags;
    }
    return {
      page,
      limit,
      list: links,
      total: counts,
    };
  }

  async findOne(id: string) {
    return await this.linksRepository.findOne({
      where: {
        id,
      },
    });
  }

  // TODO 解决：find方法中不能使用In查询
  /**
   * 根据标签id查询所有链接
   * @param tagId
   * @returns
   */
  // async findListByTagId(tagId: string) {
  //   return await this.linksRepository.findBy({
  //     tagIds: In([tagId]),
  //   });
  // }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    const link = await this.linksRepository.findOne({
      where: {
        id,
      },
    });

    // 合并实体
    const newLink = this.linksRepository.merge(link, updateLinkDto);
    return await this.linksRepository.save({
      ...newLink,
      updatedAt: new Date(),
    });
  }

  async remove(id: string) {
    const link = await this.linksRepository.findOne({
      where: {
        id,
      },
    });
    return await this.linksRepository.remove(link);
  }
}
