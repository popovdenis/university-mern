import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminActionLog } from './admin-action-log.schema';

@Injectable()
export class AdminActionLogService {
    constructor(
        @InjectModel(AdminActionLog.name) private readonly logModel: Model<AdminActionLog>,
    ) {}

    async logAction(adminId: any, action: string, details?: string): Promise<AdminActionLog> {
        const log = new this.logModel({ adminId, action, details });
        return log.save();
    }
}