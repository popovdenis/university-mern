import {Response} from "express";
import {Body, Controller, Delete, Get, Param, Post, Put, Query, Res} from '@nestjs/common';
import { EntityTypeService } from "./entity-type.service";

@Controller('entity-types')
export class EntityTypeController {
    constructor(private readonly entityTypeService: EntityTypeService) {}

    @Get()
    async findAll(@Res() res: Response): Promise<any> {
        try {
            const entities = await this.entityTypeService.findAll();
            if (!entities) {
                return res.status(404).json({ message: 'Entity Types are not found' });
            }

            const transformedEntities = entities.map((entity) => ({
                ...entity.toObject(),
                id: entity._id,
            }));

            return res.json(transformedEntities);
        } catch (error) {
            console.error('Error fetching the entity types:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get(':code')
    async findByCode(@Param('code') code: string, @Res() res: Response): Promise<any> {
        try {
            const entity = await this.entityTypeService.findByCode(code);
            if (!entity) {
                return res.status(404).json({ message: 'Entity Type is not found' });
            }

            const transformedEntity = {
                ...entity.toObject(),
                id: entity._id
            };

            return res.json(transformedEntity);
        } catch (error) {
            console.error('Error fetching the entity type:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
