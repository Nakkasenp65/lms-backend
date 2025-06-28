import userController from '../../controllers/userController.js';
import express from 'express';

const userRouter = express.Router();

//BASE_URL/v1/user + /

userRouter
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);
userRouter.route('/:userId/:email/:word').get(userController.getUser);

export default userRouter;
