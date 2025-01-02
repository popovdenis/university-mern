import {Response} from "express";
import { Body, Controller, Get, Param, Query, Res } from '@nestjs/common';
import { CourseEnrollmentService } from "../course-enrollment/course-enrollment.service";

@Controller('reports')
export class ReportController {
    constructor(private readonly enrollmentService: CourseEnrollmentService) {}

    @Get('enrollments')
    async getCourseEnrollments(@Res() res: Response): Promise<any> {
        try {
            const enrollments = await this.enrollmentService.findCourseEnrollments();
            return res.json(enrollments);
        } catch (error) {
            console.error('Error fetching course enrollments:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get('course-status')
    async getCourseStatus(@Res() res: Response): Promise<any> {
        try {
            const enrollments = await this.enrollmentService.findCourseStatuses();
            return res.json(enrollments);
        } catch (error) {
            console.error('Error fetching course enrollments:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
