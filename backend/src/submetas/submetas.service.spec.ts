import { Test, TestingModule } from '@nestjs/testing';
import { SubmetasService } from './submetas.service';

describe('SubmetasService', () => {
  let service: SubmetasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmetasService],
    }).compile();

    service = module.get<SubmetasService>(SubmetasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
