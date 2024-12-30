import { Module } from '@nestjs/common';
import { AdminUsersModule } from './admin-user/admin-users.module';
import { CustomerModule } from './customer/customer.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [AdminUsersModule, CustomerModule, CourseModule],
})
export class AdminModule {}