import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import sendEmail from '../utils/email.js';
import config from '../config/config.js';
import bcrypt from 'bcryptjs';
import tokenService from './tokenService.js';
const prisma = new PrismaClient();

const verifyEmail = async (token, password) => {
  let verification;
  try {
    verification = jwt.verify(token, config.jwt.verification);
  } catch (error) {
    console.log(error);
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Invalid or expired verification token.',
    );
  }
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        id: verification.id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.NOT_FOUND, 'Cannot find user with this id');
  }

  const salt = await bcrypt.genSalt(config.salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('check authService');

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isVerified: true,
      password: hashedPassword,
    },
  });
  return tokenService.getSessionToken(user.email);
};

const sendVerificationEmail = async (id, email) => {
  const verificationToken = tokenService.getVerificationToken({ id, email });
  const mailContent = `${process.env.FRONTEND_URL}users/verify/${verificationToken}`;
  await sendEmail(email, 'Email Verification Test', mailContent);
};

export default {
  verifyEmail,
  sendVerificationEmail,
};
