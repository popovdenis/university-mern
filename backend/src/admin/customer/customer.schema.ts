import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'customer_entity' })
export class Customer extends Document {
    @Prop({ required: true, minlength: 3 })
    firstname: string;

    @Prop({ required: true, minlength: 3 })
    lastname: string;

    @Prop({ required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'] })
    email: string;

    @Prop({ required: true, minlength: [6, 'Password must be at least 6 characters'] })
    password: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
