import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityType } from './entity-type.schema';

@Injectable()
export class EntityTypeService {
    constructor(@InjectModel(EntityType.name) private readonly entityTypeModel: Model<EntityType>) {}

    async create(createEntityDto: any): Promise<EntityType> {
        const newEntity = new this.entityTypeModel(createEntityDto);
        return newEntity.save();
    }

    async findAll(skip?: number, limit?: number, sortField?: string, sortOrder?: 'asc' | 'desc'): Promise<EntityType[]> {
        const sort = {};
        if (sortField) {
            sortField = sortField === 'id' ? '_id' : sortField;
            sort[sortField] = sortOrder === 'asc' ? 1 : -1;
        }
        if (skip && limit) {
            return this.entityTypeModel.find().sort(sort).skip(skip).limit(limit).exec();
        }

        return this.entityTypeModel.find().sort({ path: 1 }).exec();
    }

    async count(): Promise<number> {
        return this.entityTypeModel.countDocuments().exec();
    }

    async findById(id: string): Promise<EntityType> {
        return this.entityTypeModel.findById(id).exec();
    }

    async update(id: string, updateEntityDto: Partial<EntityType>): Promise<EntityType> {
        return this.entityTypeModel.findByIdAndUpdate(id, updateEntityDto, { new: true }).exec();
    }

    async delete(id: string): Promise<EntityType> {
        return this.entityTypeModel.findByIdAndDelete(id).exec();
    }
}