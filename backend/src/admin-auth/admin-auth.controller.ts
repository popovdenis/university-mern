import {Body, Controller, Get, Post, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AdminAuthService} from './admin-auth.service';
import {AdminDto} from "../admin/admin-user/dto/admin.dto";
import {LoginAdminDto} from "../admin/admin-user/dto/login-admin.dto";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller('admin-auth')
export class AdminAuthController {
    constructor(private adminAuthService: AdminAuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginAdminDto) {
        const {email, password} = loginDto;
        const admin = await this.adminAuthService.validateAdmin(email, password);

        if (!admin) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.adminAuthService.generateJwt(admin);
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