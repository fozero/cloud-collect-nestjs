import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto, @Req() req) {
    const { userId } = req.user;
    return this.favoriteService.create(userId, createFavoriteDto);
  }

  @Get()
  findAll(@Query() query) {
    const { page = 1, limit = 5 } = query;
    return this.favoriteService.findAll({
      page: +page,
      limit: +limit,
    });
  }

  // /**
  //  * 获取用户收藏列表
  //  * @param query
  //  * @param req
  //  * @returns
  //  */
  // @UseGuards(AuthGuard('jwt'))
  // @Get()
  // findListByUserId(@Query() query, @Req() req) {
  //   const { page = 1, limit = 5, favoriteFolderId } = query;
  //   const { userId } = req.user;
  //   return this.favoriteService.findAll({
  //     page: +page,
  //     limit: +limit,
  //     userId,
  //     favoriteFolderId,
  //   });
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoriteService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteService.remove(+id);
  }
}
