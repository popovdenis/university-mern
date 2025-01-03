import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {AdminUser} from "../admin/admin-user/admin-users.schema";
import {AdminDto} from "../admin/admin-user/dto/admin.dto";

@Injectable()
export class AdminAuthService {
    constructor(
        @InjectModel(AdminUser.name) private adminModel: Model<AdminUser>,
        private readonly jwtService: JwtService
    ) {}

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    generateJwt(admin: AdminUser): string {
        const payload = { sub: admin._id, email: admin.email, role: 'admin' };
        return this.jwtService.sign(payload);
    }

    async validateAdmin(email: string, password: string): Promise<AdminUser | null> {
        const admin = await this.adminModel.findOne({ email }).exec();
        if (admin && (await bcrypt.compare(password, admin.password))) {
            return admin;
        }
        return null;
    }

    async register(registerDto: AdminDto): Promise<AdminUser> {
        const { firstname, lastname, email, password } = registerDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new this.adminModel({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });
        return newAdmin.save();
    }
}