import {Body, Controller, Get, Post} from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import {AdminDto} from "../admin/admin-user/admin.dto";

@Controller('admin-auth')
export class AdminAuthController {
    constructor(private adminAuthService: AdminAuthService) {}

    @Post('login')
    async login() {
        return { message: 'Hello World from /admin-auth/login' };
    }

    @Post('register')
    async register(@Body() registerDto: AdminDto) {
        const admin = await this.adminAuthService.register(registerDto);
        return { message: 'Admin has been registered successfully', admin };
    }

    @Get()
    async index() {
        return { message: 'Hello World from /admin-auth' };
    }
}