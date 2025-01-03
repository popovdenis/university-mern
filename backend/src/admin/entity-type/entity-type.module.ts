import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntityTypeService } from './entity-type.service';
import { EntityType, EntityTypeSchema } from './entity-type.schema';
import { EntityTypeController } from './entity-type.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EntityType.name, schema: EntityTypeSchema }]),
  ],
  controllers: [EntityTypeController],
  providers: [EntityTypeService],
  exports: [EntityTypeService],
})
export class EntityTypeModule {}