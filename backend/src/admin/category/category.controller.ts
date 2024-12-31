import {Controller, Get, Post, Put, Delete, Param, Body, Res, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const ext = path.extname(file.originalname);
                    cb(null, `${uuidv4()}${ext}`);
                },
            }),
        }),
    )
    async uploadFile(@UploadedFile() file: any, @Res() res: Response) {
        try {
            if (!file) {
                return res.status(400).json({ message: 'No file provided' });
            }
            return res.status(201).json({ filePath: `/uploads/${file.filename}` });
        } catch (error) {
            console.error('Error uploading file:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post()
    async create(@Body() createCategoryDto: any, @Res() res: Response): Promise<any> {
        try {
            const newCategory = await this.categoryService.create(createCategoryDto);

            const transformedCategory = {
                ...newCategory.toObject(),
                id: newCategory._id,
            };
            delete transformedCategory._id;

            return res.status(201).json(transformedCategory);
        } catch (error) {
            console.error('Error creating category:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get()
    async findAll(
        @Res() res: Response,
        @Query('_page') page: string,
        @Query('_limit') limit: string,
        @Query('_sort') sortField?: string,
        @Query('_order') sortOrder?: 'asc' | 'desc',
    ): Promise<any> {
        try {
            const pageNumber = parseInt(page, 10) || 1;
            const limitNumber = parseInt(limit, 10) || 10;
            const skip = (pageNumber - 1) * limitNumber;

            const totalCategories = await this.categoryService.count();

            const categories = await this.categoryService.findAll(skip, limitNumber, sortField, sortOrder);

            const transformedCategories = categories.map((category) => ({
                ...category.toObject(),
                id: category._id,
            }));

            res.setHeader('X-Total-Count', totalCategories.toString());
            res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

            return res.json(transformedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get(':id')
    async findById(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
            const category = await this.categoryService.findById(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const transformedCategory = {
                ...category.toObject(),
                id: category._id
            };

            return res.json(transformedCategory);
        } catch (error) {
            console.error('Error fetching category:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCategory: Partial<{ firstname: string; lastname: string; email: string; password: string; isActive: boolean }>,
        @Res() res: Response,
    ): Promise<any> {
        try {
            const updatedCategory = await this.categoryService.update(id, updateCategory);
            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            return res.json(updatedCategory);
        } catch (error) {
            console.error('Error updating category:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
            const deletedCategory = await this.categoryService.delete(id);
            if (!deletedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            return res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting category:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}