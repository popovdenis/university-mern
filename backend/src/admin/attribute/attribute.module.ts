import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attribute, AttributeSchema } from './attribute.schema';
import { AttributeService } from './attribute.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Attribute.name, schema: AttributeSchema }])],
  providers: [AttributeService],
  exports: [AttributeService],
})
export class AttributeModule {}