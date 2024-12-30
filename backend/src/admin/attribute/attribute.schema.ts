import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'eav_attribute' })
export class Attribute extends Document {
    @Prop({ required: true, minlength: 3, unique: true })
    attributeCode: string;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true, default: [] })
    options: [string];

    @Prop({ required: true, ref: 'EntityType' })
    entityType: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, default: false })
    isRequired: boolean;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
