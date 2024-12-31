import { Module } from '@nestjs/common';
import { AdminUsersModule } from './admin-user/admin-users.module';
import { CustomerModule } from './customer/customer.module';
import { CourseModule } from './course/course.module';
import { AttributeModule } from './attribute/attribute.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AdminUsersModule, CustomerModule, CourseModule, AttributeModule, CategoryModule],
})
export class AdminModule {}