import {Controller, Get, Post, Put, Delete, Param, Body, Res, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { CourseService } from './course.service';
import { AttributeService } from '../attribute/attribute.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('courses')
export class CourseController {
    constructor(
        private readonly courseService: CourseService,
        private readonly attributeService: AttributeService
    ) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const ext = path.extname(file.originalname);
                    cb(null, `${uuidv4()}${ext}`);
                },
            }),
        }),
    )
    async uploadFile(@UploadedFile() file: any, @Res() res: Response) {
        try {
            if (!file) {
                return res.status(400).json({ message: 'No file provided' });
            }
            return res.status(201).json({ filePath: `/uploads/${file.filename}` });
        } catch (error) {
            console.error('Error uploading file:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post()
    async create(@Body() createCourseDto: any, @Res() res: Response): Promise<any> {
        try {
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
    async findAll(
        @Res() res: Response,
        @Query('_page') page: string,
        @Query('_limit') limit: string,
        @Query('_sort') sortField?: string,
        @Query('_order') sortOrder?: 'asc' | 'desc',
    ): Promise<any> {
        try {
            const pageNumber = parseInt(page, 10) || 1;
            const limitNumber = parseInt(limit, 10) || 10;
            const skip = (pageNumber - 1) * limitNumber;

            const totalCourses = await this.courseService.count();

            const courses = await this.courseService.findAll(skip, limitNumber, sortField, sortOrder);

            const transformedCourses = courses.map((course) => ({
                ...course.toObject(),
                id: course._id,
            }));

            res.setHeader('X-Total-Count', totalCourses.toString());
            res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

            return res.json(transformedCourses);
        } catch (error) {
            console.error('Error fetching courses:', error.message);
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
                attributes: await this.attributeService.findCourseAttributes()
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