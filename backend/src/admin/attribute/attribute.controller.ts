import {Response} from "express";
import {Body, Controller, Delete, Get, Param, Post, Put, Query, Res} from '@nestjs/common';
import {AttributeService} from "./attribute.service";

@Controller('attributes')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Get()
    async findAll(@Res() res: Response, @Query('_page') page: string, @Query('_limit') limit: string): Promise<any> {
        try {
            const pageNumber = parseInt(page, 10) || 1;
            const limitNumber = parseInt(limit, 10) || 10;
            const skip = (pageNumber - 1) * limitNumber;

            const totalCustomers = await this.attributeService.count();

            const entities = await this.attributeService.findAll(skip, limitNumber);

            const transformedEntities = entities.map((customer) => ({
                ...customer.toObject(),
                id: customer._id,
            }));

            res.setHeader('X-Total-Count', totalCustomers.toString());
            res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

            return res.json(transformedEntities);
        } catch (error) {
            console.error('Error fetching attributes:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get('course')
    async getCourseAttributes(@Res() res: Response): Promise<any> {
        try {
            const attributes = await this.attributeService.findCourseAttributes();
            const transformedEntities = {
                attributes: attributes.map((entity) => {
                    const { _id, ...rest } = entity;
                    return { ...rest,  id: _id };
                })
            };
            return res.json(transformedEntities);
        } catch (error) {
            console.error('Error fetching course attributes:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get(':id')
    async findById(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
            const entity = await this.attributeService.findById(id);
            if (!entity) {
                return res.status(404).json({ message: 'Attribute is not found' });
            }

            const transformedEntity = {
                ...entity.toObject(),
                id: entity._id,
            };

            return res.json(transformedEntity);
        } catch (error) {
            console.error('Error fetching attribute:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
            const deletedEntity = await this.attributeService.delete(id);
            if (!deletedEntity) {
                return res.status(404).json({ message: 'Attribute is not found' });
            }

            return res.json({ message: 'Attribute has been deleted successfully' });
        } catch (error) {
            console.error('Error while deleting attribute:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
