import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>, // private readonly jwtService: JwtService,
  ) {}

  /**
   * 创建新用户
   */
  async create(user: CreateUserDto) {
    const { username } = user;
    await this.userRepository.save(user);
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  /**
   * 根据id查询用户信息
   * @param id
   * @returns
   */
  async findOne(userId: string) {
    const existUser = await this.userRepository.findOne({
      where: { userId },
    });
    if (!existUser) {
      throw new BadRequestException('用户不存在');
    }
    return existUser;
  }

  // async findOne(data: UserFindOne) {
  //   return await this.userRepository
  //     .createQueryBuilder('user')
  //     .where(data)
  //     .addSelect('user.password')
  //     .getOne();
  // }

  /**
   * 根据用户名查询用户信息
   * @param username
   * @returns
   */
  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
