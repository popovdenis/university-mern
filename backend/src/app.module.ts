import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { ReportModule } from './admin/report/report.module';
import { CourseEnrollmentModule } from './admin/course-enrollment/course-enrollment.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/university'),
        AdminModule,
        AdminAuthModule,
        ReportModule,
        CourseEnrollmentModule,
    ],
})
export class AppModule {}