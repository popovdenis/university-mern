import {Controller, Get, Post, Put, Delete, Param, Body, Res, Query, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { Category } from './category.schema';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async create(
        @Body() createCategoryDto: any,
        @Res() res: Response,
    ): Promise<any> {
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
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
            const categories = await this.categoryService.findAll(skip, limitNumber);

            const transformedCategories = categories.map((category) => ({
                ...category.toObject(),
                id: category._id,
            }));

            res.setHeader('X-Total-Count', totalCategories.toString());
            res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

            return res.json(transformedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCategory: Partial<Category>,
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
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}