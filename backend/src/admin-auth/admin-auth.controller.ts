import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';

@Controller('admin-auth')
export class AdminAuthController {
    constructor(private readonly adminAuthService: AdminAuthService) {}

    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
        const token = await this.adminAuthService.validateAdmin(loginDto.email, loginDto.password);

        if (!token) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return { token };
    }
}