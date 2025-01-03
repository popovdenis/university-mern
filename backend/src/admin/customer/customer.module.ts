import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer, CustomerSchema } from './customer.schema';
import {CourseEnrollmentModule} from "../course-enrollment/course-enrollment.module";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
      CourseEnrollmentModule
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}