import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attribute } from './attribute.schema';
import {Course} from "../course/course.schema";

@Injectable()
export class AttributeService {
    constructor(@InjectModel(Attribute.name) private readonly attributeModel: Model<Attribute>) {}

    async create(createCourseDto: any): Promise<Attribute> {
        const newCustomer = new this.attributeModel(createCourseDto);
        return newCustomer.save();
    }

    async findAll(skip: number, limit: number): Promise<Attribute[]> {
        return this.attributeModel.find().skip(skip).limit(limit).exec();
    }

    async findCourseAttributes(): Promise<Course[]> {
        return this.attributeModel.aggregate([
            {
                $lookup: {
                    from: 'eav_entity_type',
                    localField: 'entityType',
                    foreignField: '_id',
                    as: 'entityTypeDetails',
                },
            },
            {$unwind: '$entityTypeDetails'},
            {$match: {'entityTypeDetails.entityTypeCode': 'course'}},
            {
                $project: {
                    _id: 1,
                    attributeCode: 1,
                    label: 1,
                    options: 1,
                    isRequired: 1,
                    entityTypeCode: '$entityTypeDetails.entityTypeCode',
                },
            },
        ]);
    }

    async count(): Promise<number> {
        return this.attributeModel.countDocuments().exec();
    }

    async findById(id: string): Promise<Attribute> {
        return this.attributeModel.findById(id).exec();
    }

    async findByCode(attributeCode: string): Promise<Attribute> {
        return this.attributeModel.findOne({ attributeCode }).exec();
    }

    async update(id: string, updateCourseDto: Partial<Attribute>): Promise<Attribute> {
        return this.attributeModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Attribute> {
        return this.attributeModel.findByIdAndDelete(id).exec();
    }
}