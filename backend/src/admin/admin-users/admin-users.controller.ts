import { Controller, Get, Post, Put, Delete, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminUsersService } from './admin-users.service';
import { AdminUser } from './admin-users.schema';

@Controller('admin-users')
export class AdminUsersController {
    constructor(private readonly adminUsersService: AdminUsersService) {}

    @Post()
    async create(
        @Body() createAdminUserDto: { firstname: string; lastname: string; email: string; password: string },
        @Res() res: Response,
    ): Promise<any> {
        try {
            const newAdminUser = await this.adminUsersService.create(createAdminUserDto);

            // Преобразуем результат, чтобы удалить _id
            const transformedUser = {
                ...newAdminUser.toObject(),
                id: newAdminUser._id, // Переименовываем _id в id
            };
            delete transformedUser._id; // Удаляем _id

            return res.status(201).json(transformedUser); // Ожидаемый формат ответа
        } catch (error) {
            console.error('Error creating admin user:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get()
    async findAll(@Res() res: Response): Promise<any> {
        const adminUsers = await this.adminUsersService.findAll();

        // Преобразуем массив, чтобы заменить `_id` на `id`
        const transformedUsers = adminUsers.map(user => ({
            ...user.toObject(),
            id: user._id,
        }));

        // Устанавливаем заголовки
        res.setHeader('X-Total-Count', transformedUsers.length.toString());
        res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

        return res.json(transformedUsers);
    }

    @Get(':id')
    async findById(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
            const adminUser = await this.adminUsersService.findById(id);
            if (!adminUser) {
                return res.status(404).json({ message: 'Admin user not found' });
            }

            const transformedUser = {
                ...adminUser.toObject(),
                id: adminUser._id,
            };

            return res.json(transformedUser);
        } catch (error) {
            console.error('Error fetching admin user:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAdminUserDto: Partial<{ firstname: string; lastname: string; email: string; password: string; isActive: boolean }>,
        @Res() res: Response,
    ): Promise<any> {
        try {
            const updatedAdminUser = await this.adminUsersService.update(id, updateAdminUserDto);
            if (!updatedAdminUser) {
                return res.status(404).json({ message: 'Admin user not found' });
            }

            return res.json(updatedAdminUser);
        } catch (error) {
            console.error('Error updating admin user:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
            const deletedAdminUser = await this.adminUsersService.delete(id);
            if (!deletedAdminUser) {
                return res.status(404).json({ message: 'Admin user not found' });
            }

            return res.json({ message: 'Admin user deleted successfully' });
        } catch (error) {
            console.error('Error deleting admin user:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}