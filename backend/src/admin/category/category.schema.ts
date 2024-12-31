import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'category_entity' })
export class Category extends Document {
    @Prop({ required: true, minlength: 3 })
    title: string;

    @Prop({ required: false })
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null })
    parentId: mongoose.Schema.Types.ObjectId | null;

    @Prop({ required: true, default: 0 })
    position: number;

    @Prop({ required: true, default: 0 })
    level: number;

    @Prop({ required: false })
    path: string;

    @Prop({ required: true, default: true, index: true })
    isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);