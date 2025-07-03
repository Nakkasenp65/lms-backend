import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/email.js';
const prisma = new PrismaClient();

/* 

  1. Generate Verification token and send it to the user
    - Verification token signed with userId and userEmail
    - We can then get userId from the token from user query
  2. Verify user from ?token=<...> Which will be sent if user click link in the email.
  3. deliver the accessToken and refreshToken to the user.
*/

const verifyEmail = async (token) => {
  const verification = jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
  console.log(verification);

  const user = await prisma.user.findUnique({
    where: {
      id: verification.id,
    },
  });
  if (!user)
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid Token: user not found.');

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      isVerified: true,
    },
  });
  return generateToken.getSessionToken(user.email);
};

const sendVerificationEmail = async (id, email) => {
  const verificationToken = generateToken.getVerificationToken({ id, email });
  const mailContent = `${process.env.FRONTEND_URL}users/verify/${verificationToken}`;
  await sendEmail(email, 'Email Verification Test', mailContent);
};

const verifyToken = () => {};

export default {
  verifyEmail,
  verifyToken,
  sendVerificationEmail,
};
