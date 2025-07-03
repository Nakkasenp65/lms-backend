import authService from '../services/authService.js';
import userService from '../services/userService.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import generateToken from '../utils/generateToken.js';

const verifyEmail = catchAsync(async (req, res) => {
  const token = req.params.token;
  const tokens = await authService.verifyEmail(token);
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
  // const existingUser = await userService.getUserByEmail(email);
  // if (existingUser) {
  //   res
  //     .status(httpStatus.CONFLICT)
  //     .json({ message: 'Email has already registered' });
  // }
  // const user = await userService.createUser(email);
  const user = await userService.getUserByEmail(email);
  if (user) {
    // authService.sendVerificationEmail(user.id, user.email);
    const { id, email } = user;
    const verificationToken = generateToken.getVerificationToken({ id, email });
    res.status(httpStatus.CREATED).json({
      // message: 'User registered successfully and verification email sent.',
      message: `${process.env.FRONTEND_URL}users/verify/${verificationToken}`,
    });
  } else {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating user');
  }
});

export default { verifyEmail, register };
