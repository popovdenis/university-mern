import {Body, Controller, Get, Post, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AdminAuthService} from './admin-auth.service';
import {AdminDto} from "../admin/admin-user/dto/admin.dto";
import {LoginAdminDto} from "../admin/admin-user/dto/login-admin.dto";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {AdminActionLogService} from "./admin-action-log.service";

@Controller('admin-auth')
export class AdminAuthController {
    constructor(
        private adminAuthService: AdminAuthService,
        private actionLogService: AdminActionLogService
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginAdminDto) {
        const admin = await this.adminAuthService.validateAdmin(
            loginDto.email,
            loginDto.password
        );

        if (!admin) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.adminAuthService.generateJwt(admin);

        await this.actionLogService.logAction(admin._id, 'admin_login', `Admin ${admin.email} logged in`);

        return {message: 'Login successful', token};
    }

    @Post('register')
    async register(@Body() registerDto: AdminDto) {
        const admin = await this.adminAuthService.register(registerDto);
        return {message: 'Admin has been registered successfully', admin};
    }

    @Get()
    async index() {
        return {message: 'Hello World from /admin-auth'};
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    async protectedRoute() {
        return { message: 'You have accessed a protected route!' }
    }
}