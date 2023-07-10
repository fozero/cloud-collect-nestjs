import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  /**
   * 创建标签
   * @param userId
   * @param createTagDto
   * @returns
   */
  create(userId: string, createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create({
      ...createTagDto,
      userId,
    });

    return this.tagRepository.save(tag);
  }

  findAll() {
    return this.tagRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  //   findByIds方法废弃了，使用findBy代替
  //   @deprecated
  // use findBy method instead in conjunction with In operator, for example:
  // .findBy({ id: In([1, 2, 3]) })

  /**
   * 根据id数组查询标签
   * @param ids
   *
   */
  // TODO 只查询返回部分字段
  async findByIds(ids: string[]) {
    return await this.tagRepository.findBy({
      id: In(ids),
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
