import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

    async create(createCategoryDto: any): Promise<Category> {
        const newCategory = new this.categoryModel(createCategoryDto);
        return newCategory.save();
    }

    async findAll(skip: number, limit: number, sortField?: string, sortOrder?: 'asc' | 'desc'): Promise<Category[]> {
        const sort = {};
        if (sortField) {
            sortField = sortField === 'id' ? '_id' : sortField;
            sort[sortField] = sortOrder === 'asc' ? 1 : -1;
        }

        return this.categoryModel
            .find()
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec();
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
        return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Category> {
        return this.categoryModel.findByIdAndDelete(id).exec();
    }
}