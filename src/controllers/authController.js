import authService from '../services/authService.js';
import userService from '../services/userService.js';
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';

const verifyEmail = catchAsync(async (req, res) => {
  const tokens = await authService.verifyEmail(req.body.token);
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.BASE_URL === 'http://localhost:3000' ? false : true,
  });
  res.cookie('accessToken', tokens.accessToken, {
    httpOnly: true,
    secure: process.env.BASE_URL === 'http://localhost:3000' ? false : true,
  });
  res.status(httpStatus.OK).json({ message: 'Email Verification success' });
});

const register = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await userService.createUser(email);
  await authService.sendVerificationEmail(user.id, user.email);
  res.status(httpStatus.CREATED).json(user);
});

export default { verifyEmail, register };
