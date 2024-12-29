import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/university'),
        AdminModule,
        AdminAuthModule,
    ],
})
export class AppModule {}