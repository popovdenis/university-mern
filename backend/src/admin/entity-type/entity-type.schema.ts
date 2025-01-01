import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'eav_entity_type' })
export class EntityType extends Document {
    @Prop({ required: true, unique: true })
    entityTypeCode: string;
}

export const EntityTypeSchema = SchemaFactory.createForClass(EntityType);
