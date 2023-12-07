import { Test, TestingModule } from '@nestjs/testing';
import { SubmetasController } from './submetas.controller';
import { SubmetasService } from './submetas.service';

describe('SubmetasController', () => {
  let controller: SubmetasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmetasController],
      providers: [SubmetasService],
    }).compile();

    controller = module.get<SubmetasController>(SubmetasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
