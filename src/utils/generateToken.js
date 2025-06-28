import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getSessionToken = (email) => {
  const accessToken = jwt.sign(
    { email: email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1d', algorithm: 'HS256' },
  );

  const refreshToken = jwt.sign(
    { email: email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '60d', algorithm: 'HS256' },
  );

  return { accessToken, refreshToken };
};

const getVerificationToken = (userData) => {
  const { id, email } = userData;

  const verificationToken = jwt.sign(
    {
      id: id,
      email: email,
    },
    process.env.VERIFICATION_TOKEN_SECRET,
    { expiresIn: '1d', algorithm: 'HS256' },
  );
  return verificationToken;
};

export default { getSessionToken, getVerificationToken };
