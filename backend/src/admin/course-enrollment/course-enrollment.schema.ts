import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'course_enrollments' })
export class CourseEnrollment extends Document {
    @Prop({ required: true, ref: 'Course', type: mongoose.Schema.Types.ObjectId, index: true })
    course: string;

    @Prop({ required: true, ref: 'Customer', type: mongoose.Schema.Types.ObjectId, index: true })
    customer: string;

    @Prop({ required: true, enum: ['started', 'stopped', 'completed'], default: 'started', index: true })
    status: string;

    @Prop({ type: Date, default: Date.now })
    enrolledAt: string;

    @Prop({ type: Date })
    completedAt: string;
}

export const CourseEnrollmentSchema = SchemaFactory.createForClass(CourseEnrollment);

CourseEnrollmentSchema.index({ course: 1, customer: 1 }, { unique: true });