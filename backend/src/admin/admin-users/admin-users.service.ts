import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminUser } from './admin-users.schema';

@Injectable()
export class AdminUsersService {
    constructor(@InjectModel(AdminUser.name) private readonly adminUserModel: Model<AdminUser>) {}

    async create(createAdminUserDto: any): Promise<AdminUser> {
        const newAdminUser = new this.adminUserModel(createAdminUserDto);
        return newAdminUser.save();
    }

    async findAll(): Promise<AdminUser[]> {
        return this.adminUserModel.find().exec();
    }

    async findById(id: string): Promise<AdminUser> {
        return this.adminUserModel.findById(id).exec();
    }

    async update(id: string, updateAdminUserDto: Partial<AdminUser>): Promise<AdminUser> {
        return this.adminUserModel.findByIdAndUpdate(id, updateAdminUserDto, { new: true }).exec();
    }

    async delete(id: string): Promise<AdminUser> {
        return this.adminUserModel.findByIdAndDelete(id).exec();
    }
}