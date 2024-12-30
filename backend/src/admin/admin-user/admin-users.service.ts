import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminUser } from './admin-users.schema';
import {Customer} from "../customer/customer.schema";

@Injectable()
export class AdminUsersService {
    constructor(@InjectModel(AdminUser.name) private readonly adminUserModel: Model<AdminUser>) {}

    async create(createAdminUserDto: any): Promise<AdminUser> {
        const newAdminUser = new this.adminUserModel(createAdminUserDto);
        return newAdminUser.save();
    }

    async findAll(skip: number, limit: number): Promise<Customer[]> {
        return this.adminUserModel.find().skip(skip).limit(limit).exec();
    }

    async count(): Promise<number> {
        return this.adminUserModel.countDocuments().exec();
    }

    async findById(id: string): Promise<AdminUser> {
        return this.adminUserModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<AdminUser | null> {
        return this.adminUserModel.findOne({ email });
    }

    async update(id: string, updateAdminUserDto: Partial<AdminUser>): Promise<AdminUser> {
        return this.adminUserModel.findByIdAndUpdate(id, updateAdminUserDto, { new: true }).exec();
    }

    async delete(id: string): Promise<AdminUser> {
        return this.adminUserModel.findByIdAndDelete(id).exec();
    }
}