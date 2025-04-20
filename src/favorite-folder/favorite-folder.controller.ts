import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Query,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoriteFolderService } from './favorite-folder.service';
import { CreateFavoriteFolderDto } from './dto/create-favorite-folder.dto';
import { UpdateFavoriteFolderDto } from './dto/update-favorite-folder.dto';
import { User } from '../core/decorator/user.decorator';

@Controller('favorite-folder')
export class FavoriteFolderController {
  constructor(private readonly favoriteFolderService: FavoriteFolderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createFavoriteFolderDto: CreateFavoriteFolderDto, @Req() req) {
    const { userId } = req.user;
    return this.favoriteFolderService.create(userId, createFavoriteFolderDto);
  }

  @Get()
  async findAll(@Req() req, @Query() query, @User("userId") userId) {
    console.log('user123', userId);

    console.log('request.cookies10', req.cookies,req.user);

    // const payload = await this.jwtService.verifyAsync(
    //   token,
    //   {
    //     secret: jwtConstants.secret
    //   }
    // );

    const { page = 1, limit = 5 } = query;
    return await this.favoriteFolderService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteFolderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteFolderDto: UpdateFavoriteFolderDto,
  ) {
    return this.favoriteFolderService.update(+id, updateFavoriteFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteFolderService.remove(+id);
  }
}
