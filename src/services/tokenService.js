import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const getSessionToken = (email) => {
  const accessToken = jwt.sign({ email: email }, config.jwt.accessSecret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  const refreshToken = jwt.sign({ email: email }, config.jwt.refreshSecret, {
    expiresIn: '60d',
    algorithm: 'HS256',
  });

  return { accessToken, refreshToken };
};

const getVerificationToken = (userData) => {
  const { id, email } = userData;

  const verificationToken = jwt.sign(
    {
      id: id,
      email: email,
    },
    config.jwt.verification,
    { expiresIn: '1d', algorithm: 'HS256' },
  );
  return verificationToken;
};

export default { getSessionToken, getVerificationToken };
