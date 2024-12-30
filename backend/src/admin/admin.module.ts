import { Module } from '@nestjs/common';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { CustomerModule } from './customers/customer.module';

@Module({
  imports: [AdminUsersModule, CustomerModule],
})
export class AdminModule {}