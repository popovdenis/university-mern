import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import {CourseEnrollmentModule} from "../course-enrollment/course-enrollment.module";

@Module({
  imports: [
      CourseEnrollmentModule
  ],
  controllers: [ReportController]
})
export class ReportModule {}
