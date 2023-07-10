import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  // 从@Req() req里面可以拿到jwt的用户信息
  // user: {
  //   userId: '4d8b498e-b743-46e4-bdf8-91c25212441b',
  //   username: 'kerrywu'
  // }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createLinkDto: CreateLinkDto, @Req() req) {
    const { userId } = req.user;
    return this.linkService.create(userId, createLinkDto);
  }

  @Get()
  findAll(@Query() query) {
    const { page = 0, limit = 5, categoryId, tagId } = query;
    return this.linkService.findAll(+page, +limit, categoryId, tagId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(id);
  }

  /**
   * 根据标签id查询所有链接
   * @param id
   * @returns
   */
  // @Get('/tagId/:id')
  // findListByTagId(@Param('id') id: string) {
  //   return this.linkService.findListByTagId(id);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(id, updateLinkDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(id);
  }
}
