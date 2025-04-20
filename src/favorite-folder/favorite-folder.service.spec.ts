import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteFolderService } from './favorite-folder.service';

describe('FavoriteFolderService', () => {
  let service: FavoriteFolderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteFolderService],
    }).compile();

    service = module.get<FavoriteFolderService>(FavoriteFolderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
