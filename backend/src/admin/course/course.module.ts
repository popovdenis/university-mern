import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course, CourseSchema } from './course.schema';
import { AttributeModule } from '../attribute/attribute.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    AttributeModule,
    CategoryModule
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}