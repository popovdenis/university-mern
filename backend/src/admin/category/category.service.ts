import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

    async create(createCategoryDto: any): Promise<Category> {
        const { parentId } = createCategoryDto;

        let path = '';
        let level = 0;

        if (parentId) {
            const parentCategory = await this.categoryModel.findById(parentId);
            if (!parentCategory) {
                throw new Error('Parent category not found');
            }
            createCategoryDto.path = parentCategory.path
                ? `${parentCategory.path}/${parentCategory._id}`
                : `${parentCategory._id}`;
            createCategoryDto.level = (parentCategory.level || 0) + 1;
        } else {
            createCategoryDto.level = 0;
            createCategoryDto.path = '';
        }

        const category = new this.categoryModel(createCategoryDto);
        return category.save();
    }

    async findAll(skip?: number, limit?: number, sortField?: string, sortOrder?: 'asc' | 'desc'): Promise<Category[]> {
        const sort = {};
        if (sortField) {
            sortField = sortField === 'id' ? '_id' : sortField;
            sort[sortField] = sortOrder === 'asc' ? 1 : -1;
        }
        if (skip && limit) {
            return this.categoryModel.find().sort(sort).skip(skip).limit(limit).exec();
        }

        return this.categoryModel.find().sort({ path: 1 }).exec();
    }

    async count(): Promise<number> {
        return this.categoryModel.countDocuments().exec();
    }

    async findById(id: string): Promise<Category> {
        return this.categoryModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<Category | null> {
        return this.categoryModel.findOne({ email });
    }

    async update(id: string, updateCategoryDto: Partial<Category>): Promise<Category> {
        const { parentId } = updateCategoryDto;
        let path = '';
        let level = 0;

        if (parentId) {
            const parentCategory = await this.categoryModel.findById(parentId).exec();
            if (!parentCategory) {
                throw new Error('Parent category not found');
            }
            level = parentCategory.level + 1;
            path = parentCategory.path ? `${parentCategory.path}/${parentCategory._id}` : `${parentCategory._id}`;
        }

        const category = await this.categoryModel.findByIdAndUpdate(
            id,
            { ...updateCategoryDto, level, path },
            { new: true },
        ).exec();

        if (!category) {
            throw new Error('Category not found');
        }

        return category;
    }

    async delete(id: string): Promise<Category> {
        return this.categoryModel.findByIdAndDelete(id).exec();
    }
}