import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';

@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name) private readonly customerModel: Model<Customer>) {}

    async create(createCustomerDto: any): Promise<Customer> {
        const newCustomer = new this.customerModel(createCustomerDto);
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

    async findByEmail(email: string): Promise<Customer | null> {
        return this.customerModel.findOne({ email });
    }

    async update(id: string, updateCustomerDto: Partial<Customer>): Promise<Customer> {
        return this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Customer> {
        return this.customerModel.findByIdAndDelete(id).exec();
    }
}