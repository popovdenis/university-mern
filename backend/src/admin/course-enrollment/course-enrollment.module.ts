import { Module } from '@nestjs/common';
import { CourseEnrollmentController } from './course-enrollment.controller';
import { CourseEnrollmentService } from './course-enrollment.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CourseEnrollment, CourseEnrollmentSchema} from "./course-enrollment.schema";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: CourseEnrollment.name, schema: CourseEnrollmentSchema }])
  ],
  controllers: [CourseEnrollmentController],
  providers: [CourseEnrollmentService],
  exports: [CourseEnrollmentService],
})
export class CourseEnrollmentModule {}
