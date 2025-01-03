import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'logging_events' })
export class AdminActionLog extends Document {
    @Prop({ required: true })
    adminId: string;

    @Prop({ required: true })
    action: string;

    @Prop()
    details: string;
}

export const AdminActionLogSchema = SchemaFactory.createForClass(AdminActionLog);