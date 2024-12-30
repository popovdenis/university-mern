import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.schema';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name) private readonly customerModel: Model<Course>) {}

    async create(createCourseDto: any): Promise<Course> {
        const newCustomer = new this.customerModel(createCourseDto);
        return newCustomer.save();
    }

    async findAll(skip: number, limit: number): Promise<Course[]> {
        return this.customerModel.find().skip(skip).limit(limit).exec();
    }

    async count(): Promise<number> {
        return this.customerModel.countDocuments().exec();
    }

    async findById(id: string): Promise<Course> {
        return this.customerModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<Course | null> {
        return this.customerModel.findOne({ email });
    }

    async update(id: string, updateCourseDto: Partial<Course>): Promise<Course> {
        return this.customerModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Course> {
        return this.customerModel.findByIdAndDelete(id).exec();
    }
}