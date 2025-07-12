import authService from '../services/authService.js';
import userService from '../services/userService.js';
// import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import config from '../config/config.js';
import tokenService from '../services/tokenService.js';

const getVerficationToken = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await userService.getUserByEmail(email);
  const token = tokenService.getVerificationToken(user);
  res.status(httpStatus.OK).json({ token: token });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { token, password } = req.body;
  const message = await authService.verifyEmail(token, password);
  res.cookie('refreshToken', message.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    sameSite: 'Lax', // Or 'Strict' depending on your CSRF requirements
    maxAge: 60 * 24 * 60 * 60 * 1000,
  });

  res.status(httpStatus.OK).send({
    message: 'Email verified and password set successfully!',
    accessToken: message.accessToken, // Send the access token for the frontend to store in memory
  });
});

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body.email);
  await authService.sendVerificationEmail(user.id, user.email);
  const verificationToken = tokenService.getVerificationToken(user);
  res.status(httpStatus.CREATED).json({
    // message: 'User registered successfully and verification email sent.',
    message: `${config.url.front}users/verify/${verificationToken}`,
  });
});

export default { getVerficationToken, verifyEmail, register };
