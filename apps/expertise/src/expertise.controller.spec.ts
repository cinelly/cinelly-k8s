import { Test, TestingModule } from '@nestjs/testing';
import { ExpertiseController } from './expertise.controller';
import { ExpertiseService } from './expertise.service';

describe('ExpertiseController', () => {
  let expertiseController: ExpertiseController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExpertiseController],
      providers: [ExpertiseService],
    }).compile();

    expertiseController = app.get<ExpertiseController>(ExpertiseController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(expertiseController.getHello()).toBe('Hello World!');
    });
  });
});
