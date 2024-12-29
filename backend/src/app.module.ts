import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/my-university'),
        AdminModule,
    ],
})
export class AppModule {}