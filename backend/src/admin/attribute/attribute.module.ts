import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attribute, AttributeSchema } from './attribute.schema';
import {AttributeController} from "./attribute.controller";
import { AttributeService } from './attribute.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Attribute.name, schema: AttributeSchema }])],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [AttributeService],
})
export class AttributeModule {}