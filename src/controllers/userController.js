import catchAsync from '../utils/catchAsync.js';
import userService from '../services/userService.js';
import httpStatus from 'http-status';

// req.params = link = /:userId/:profile/:age
// req.query = link = /user?name=Gourav&age=11:
// body = req.body = { "userId" : "123" }

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);
  res.status(httpStatus.OK).json(user);
});

// Only Admin
const getUsers = catchAsync(async (_, res) => {
  const response = await userService.getUsers();
  res.status(httpStatus.OK).send(response);
});

const createUser = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await userService.createUser(email);
  res.status(httpStatus.CREATED).send(user);
});

export default { createUser, getUser, getUsers };
