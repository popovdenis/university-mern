import { Test, TestingModule } from '@nestjs/testing';
import { EntityTypeService } from './entity-type.service';

describe('EntityTypeService', () => {
  let service: EntityTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntityTypeService],
    }).compile();

    service = module.get<EntityTypeService>(EntityTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
