import { PrismaClient} from '@prisma/client' ;
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient();

const createCourse = async (coursetitle) => {
    const existingCourse = await prisma.course.findUnique({
        where: {
            coursetitle: coursetitle,
        },
    });

    if (existingCourse) {
        throw new ApiError(httpStatus.CONFLICT, 'Course already created');
    }

    const course = await prisma.course.create({
        data: {
            coursetitle: coursetitle,
            description: description,
            instructor: {connect: {id: data.instructorId}}
        },  
    });

    return course;
}

const getCourseById = async (id) => {
    if (!id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required');
    }

    return prisma.course.findUnique({
        where: { id },
    });
};

const getCourseByCoursetitle = async (coursetitle) => {
    if(!coursetitle) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Course Name are required');
    }

    return prisma.course.findUnique({
        where: { coursetitle },
    });
};

const getCourses = async () => {
    return prisma.course.findMany({
        include: {intructor: true}
    });
}

const updateCourse = async (id, data) => {
    const course = await getUserById(id);
    Object.assign(course, data);
    prisma.course.update({
        where: { id },
        data: {data},
    });
};

const deleteCourse = async (id) => {
    if (!id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Course Name is required');
    }

    return prisma.course.delete({
        where: { id },
    });
};

export default {
    createCourse,
    getCourseById,
    getCourseByCoursetitle,
    getCourses,
    updateCourse,
    deleteCourse,
};