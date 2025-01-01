import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'courses' })
export class Course extends Document {
    @Prop({ required: true, minlength: 3 })
    title: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: false })
    duration: string;

    @Prop({ required: false })
    level: string;

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}], required: true, index: true })
    categories: mongoose.Schema.Types.ObjectId[];

    @Prop({ required: false, ref: 'Customer', index: true })
    instructor: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, default: 0, index: true })
    price: number;

    @Prop({ required: false })
    image: string;

    @Prop({ required: true, default: true, index: true })
    isActive: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);