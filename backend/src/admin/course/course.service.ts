import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.schema';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name) private readonly courseModel: Model<Course>) {}

    async create(createCourseDto: any): Promise<Course> {
        const newCourse = new this.courseModel(createCourseDto);
        return newCourse.save();
    }

    async findByIdWithCategories(id: string): Promise<Course> {
        return this.courseModel
            .findById(id)
            .populate('categories', 'title description path')
            .exec();
    }

    async findAll(
        query: Record<string, any> = {},
        skip: number,
        limit: number,
        sortField?: string,
        sortOrder?: 'asc' | 'desc'
    ): Promise<Course[]> {
        const sort = {};
        if (sortField) {
            sortField = sortField === 'id' ? '_id' : sortField;
            sort[sortField] = sortOrder === 'asc' ? 1 : -1;
        }

        return this.courseModel
            .find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec();
    }

    async count(query: Record<string, any>): Promise<number> {
        return this.courseModel.countDocuments(query).exec();
    }

    async findById(id: string): Promise<Course> {
        return this.courseModel.findById(id).exec();
    }

    async findCoursesWithCategories(): Promise<Course[]> {
        return this.courseModel.find().populate('categories').exec();
    }

    async update(id: string, updateCourseDto: any): Promise<Course> {
        return this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Course> {
        return this.courseModel.findByIdAndDelete(id).exec();
    }

    async assignCategories(courseId: string, categoryIds: string[]): Promise<Course> {
        return this.courseModel
            .findByIdAndUpdate(
                courseId,
                { $addToSet: { categories: { $each: categoryIds } } },
                { new: true },
            )
            .populate('categories')
            .exec();
    }

    async removeCategory(courseId: string, categoryId: string): Promise<Course> {
        return this.courseModel
            .findByIdAndUpdate(
                courseId,
                { $pull: { categories: categoryId } },
                { new: true },
            )
            .populate('categories')
            .exec();
    }
}