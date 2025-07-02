import catchAsync from '../utils/catchAsync.js';
import courseService from '../services/courseService.js';
import httpStatus from 'http-status';

const getCourse = catchAsync(async (req,res) => {
    const { courseId, coursetitle, word } = req.params; 
    console.log(courseId, 'coursetitle: ', coursetitle, 'word',word );
    const user = await courseService.getCourseById(courseID);
    res.status(httpStatus.OK).json(course);
});

const getCourses = catchAsync(async (_,res)=>{
    const response = await courseService.getCourses();
    res.status(httpStatus.OK).send(response);
});

const createCourse = catchAsync(async (req, res) => {
    const { coursetitle } = req.body;
    const course = await courseService.createCourse(coursetitle);
    res.status(httpStatus.CREATED).send(course);
});

export default { createCourse, getCourse, getCourses}