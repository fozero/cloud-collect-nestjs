import {
  Controller,
  Get,
  Body,
  Query,
  Req,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FavoriteService } from '../favorite/favorite.service';
import { FavoriteFolderService } from '../favorite-folder/favorite-folder.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly favoriteService: FavoriteService,
    private readonly favoriteFolderService: FavoriteFolderService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * 获取个人信息
   * @param req
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/getUserInfo')
  getUserInfo(@Req() req) {
    // console.log('request.cookies1111', req,req.cookies);

    const { userId } = req.user;
    return this.userService.findOne(userId);
  }

  /**
   * 分页获取我的收藏列表
   * @param query
   * @param req
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/getMyFavoriteList')
  getMyFavoriteList(@Query() query, @Req() req) {
    const { userId } = req.user;
    const { page = 1, limit = 5, favoriteFolderId } = query;
    return this.favoriteService.findAll({
      page: +page,
      limit: +limit,
      userId,
      favoriteFolderId,
    });
  }

  /**
   * 获取我的全部收藏夹
   * @param req
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/getMyAllFavoriteFolderList')
  getMyFavoriteFolderList(@Req() req) {
    const { userId } = req.user;
    return this.favoriteFolderService.findAllByUserId(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
