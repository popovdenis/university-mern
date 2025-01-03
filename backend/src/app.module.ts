import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { AdminModule } from './admin/admin.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { ReportModule } from './admin/report/report.module';
import { CourseEnrollmentModule } from './admin/course-enrollment/course-enrollment.module';

dotenv.config({ path: '.env.local' });

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DB_CONNECTION),
        AdminModule,
        AdminAuthModule,
        ReportModule,
        CourseEnrollmentModule,
    ],
})
export class AppModule {}