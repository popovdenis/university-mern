import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { AdminUser } from './admin-users.schema';

@Controller('admin-users')
export class AdminUsersController {
    constructor(private readonly adminUsersService: AdminUsersService) {}

    @Post()
    async create(
        @Body() createAdminUserDto: { firstname: string; lastname: string; email: string; password: string },
    ): Promise<AdminUser> {
        return this.adminUsersService.create(createAdminUserDto);
    }

    @Get()
    async findAll(): Promise<AdminUser[]> {
        return this.adminUsersService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<AdminUser> {
        return this.adminUsersService.findById(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAdminUserDto: Partial<{ firstname: string; lastname: string; email: string; password: string }>,
    ): Promise<AdminUser> {
        return this.adminUsersService.update(id, updateAdminUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<AdminUser> {
        return this.adminUsersService.delete(id);
    }
}