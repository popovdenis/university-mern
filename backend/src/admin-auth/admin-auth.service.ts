import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminUser } from '../admin/admin-user/admin-users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
    constructor(
        @InjectModel(AdminUser.name) private readonly adminUserModel: Model<AdminUser>,
        private readonly jwtService: JwtService,
    ) {}

    async validateAdmin(email: string, password: string): Promise<string | null> {
        const admin = await this.adminUserModel.findOne({ email });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return null; // Возвращаем null при ошибке авторизации
        }

        // Генерация JWT-токена
        return this.jwtService.sign({ id: admin._id, email: admin.email });
    }
}