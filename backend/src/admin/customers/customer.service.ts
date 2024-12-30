import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';
import {AdminUser} from "../admin-users/admin-users.schema";

@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name) private readonly customerModel: Model<Customer>) {}

    async create(createAdminUserDto: any): Promise<Customer> {
        const newCustomer = new this.customerModel(createAdminUserDto);
        return newCustomer.save();
    }

    async findAll(skip: number, limit: number): Promise<Customer[]> {
        return this.customerModel.find().skip(skip).limit(limit).exec();
    }

    async count(): Promise<number> {
        return this.customerModel.countDocuments().exec();
    }

    async findById(id: string): Promise<Customer> {
        return this.customerModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<AdminUser | null> {
        return this.customerModel.findOne({ email });
    }

    async update(id: string, updateAdminUserDto: Partial<Customer>): Promise<Customer> {
        return this.customerModel.findByIdAndUpdate(id, updateAdminUserDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Customer> {
        return this.customerModel.findByIdAndDelete(id).exec();
    }
}