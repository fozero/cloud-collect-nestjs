import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteFolderDto } from './create-favorite-folder.dto';

export class UpdateFavoriteFolderDto extends PartialType(CreateFavoriteFolderDto) {}
