import { Test, TestingModule } from '@nestjs/testing';
import { CourseEnrollmentController } from './course-enrollment.controller';

describe('CourseEnrollmentController', () => {
  let controller: CourseEnrollmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseEnrollmentController],
    }).compile();

    controller = module.get<CourseEnrollmentController>(CourseEnrollmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
