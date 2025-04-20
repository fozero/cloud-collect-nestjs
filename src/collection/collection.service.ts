import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionService {
  constructor(
    // 通过InjectRepository装饰器将CollectionRepository注入到collectionService 中
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  async create(userId: string, createCollectionDto: CreateCollectionDto) {
    return await this.collectionRepository.save(
      this.collectionRepository.create({
        ...createCollectionDto,
        userId,
      }),
    );
  }

  findAll() {
    return `This action returns all collection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
