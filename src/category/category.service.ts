import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  /**
   * 创建分类
   * @param userId
   * @param createCategoryDto
   * @returns
   */
  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    const tag = await this.categoryRepository.create({
      ...createCategoryDto,
      userId,
    });

    return this.categoryRepository.save(tag);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  /**
   * 根据id查询
   * @param id
   * @returns
   */
  async findOne(id: string) {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
