import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ObjectId } from "mongodb";
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

    async findCustomerCourses(customerId: string, skip: number, limit: number): Promise<{ data: any[], total: number }> {
        const result = await this.enrollmentModel.aggregate([
            {
                $match: {
                    customer: new ObjectId(customerId)
                }
            },
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
                $project: {
                    // _id: 0,
                    id: '$courseDetails._id',
                    title: '$courseDetails.title',
                    duration: '$courseDetails.duration',
                    level: '$courseDetails.level',
                    isActive: '$courseDetails.isActive',
                }
            },
            {
                $facet: {
                    metadata: [
                        { $count: 'total' },
                    ],
                    data: [
                        { $skip: skip },
                        { $limit: limit },
                    ],
                },
            },
            {
                $unwind: {
                    path: '$metadata',
                    preserveNullAndEmptyArrays: true, // prevent error if the list is empty
                },
            },
            {
                $project: {
                    total: '$metadata.total',
                    data: 1,
                },
            },
        ]);

        return (result.length === 0) ? { data: [], total: 0 } : result[0];
    }
}
