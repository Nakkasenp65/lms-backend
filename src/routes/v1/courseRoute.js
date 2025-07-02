import courseController from '../../controllers/courseController';
import express from 'express';

const courseRouter = express.Router();

courseRouter
    .route('/')
    .get(courseController.getCourses)
    .post(courseController.createCourse);
courseRouter.route('/:courseId/:coursetitle/:word').get(courseController.getCourse);

export default courseRouter;