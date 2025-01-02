import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseEnrollment } from "./course-enrollment.schema";

@Injectable()
export class CourseEnrollmentService {
    constructor(@InjectModel(CourseEnrollment.name) private readonly enrollmentModel: Model<CourseEnrollment>) {}

    async findCourseEnrollments(): Promise<CourseEnrollment[]> {
        return this.enrollmentModel.aggregate([
            {
                $lookup: {
                    from: 'courses',
                    localField: 'course',
                    foreignField: '_id',
                    as: 'courseDetails',
                },
            },
            {
                $unwind: '$courseDetails'
            },
            {
                $group: {
                    _id: "$courseDetails.level",
                    subscribers: { $sum: 1 }
                }
            },
            {
                $project: {
                    level: '$_id',
                    subscribers: 1,
                    _id: 0
                }
            },
            {
                $sort: { subscribers: -1 }
            }
        ]);
    }

    async findCourseStatuses(): Promise<CourseEnrollment[]> {
        return this.enrollmentModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    status: '$_id',
                    count: 1,
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
    }
}
