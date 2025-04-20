import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteFolderController } from './favorite-folder.controller';
import { FavoriteFolderService } from './favorite-folder.service';

describe('FavoriteFolderController', () => {
  let controller: FavoriteFolderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteFolderController],
      providers: [FavoriteFolderService],
    }).compile();

    controller = module.get<FavoriteFolderController>(FavoriteFolderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
