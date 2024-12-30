import { Controller, Get, Post, Put, Delete, Param, Body, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post()
    async create(
        @Body() createCourseDto: { firstname: string; lastname: string; email: string; password: string },
        @Res() res: Response,
    ): Promise<any> {
        try {
            // const existingCustomer = await this.customerService.findByEmail(createCourseDto.email);
            // if (existingCustomer) {
            //     return res.status(400).json({ message: 'Customer with this email already exists' });
            // }

            const newCourse = await this.courseService.create(createCourseDto);

            const transformedCourse = {
                ...newCourse.toObject(),
                id: newCourse._id,
            };
            delete transformedCourse._id;

            return res.status(201).json(transformedCourse);
        } catch (error) {
            console.error('Error creating course:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get()
    async findAll(@Res() res: Response, @Query('_page') page: string, @Query('_limit') limit: string): Promise<any> {
        try {
            const pageNumber = parseInt(page, 10) || 1;
            const limitNumber = parseInt(limit, 10) || 10;
            const skip = (pageNumber - 1) * limitNumber;

            const totalCustomers = await this.courseService.count();

            const customers = await this.courseService.findAll(skip, limitNumber);

            const transformedCustomers = customers.map((customer) => ({
                ...customer.toObject(),
                id: customer._id,
            }));

            // Установка заголовков для клиента
            res.setHeader('X-Total-Count', totalCustomers.toString());
            res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

            return res.json(transformedCustomers);
        } catch (error) {
            console.error('Error fetching customers:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get(':id')
    async findById(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
            const course = await this.courseService.findById(id);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

            const transformedCourse = {
                ...course.toObject(),
                id: course._id,
            };

            return res.json(transformedCourse);
        } catch (error) {
            console.error('Error fetching course:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCourse: Partial<{ firstname: string; lastname: string; email: string; password: string; isActive: boolean }>,
        @Res() res: Response,
    ): Promise<any> {
        try {
            const updatedCourse = await this.courseService.update(id, updateCourse);
            if (!updatedCourse) {
                return res.status(404).json({ message: 'Course not found' });
            }

            return res.json(updatedCourse);
        } catch (error) {
            console.error('Error updating course:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
            const deletedCourse = await this.courseService.delete(id);
            if (!deletedCourse) {
                return res.status(404).json({ message: 'Course not found' });
            }

            return res.json({ message: 'Course deleted successfully' });
        } catch (error) {
            console.error('Error deleting course:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}