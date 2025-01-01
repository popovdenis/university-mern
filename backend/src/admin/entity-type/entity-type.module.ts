import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntityTypeService } from './entity-type.service';
import { EntityType, EntityTypeSchema } from './entity-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EntityType.name, schema: EntityTypeSchema }]),
  ],
  providers: [EntityTypeService],
  exports: [EntityTypeService],
})
export class EntityTypeModule {}