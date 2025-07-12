import catchAsync from '../utils/catchAsync.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const auth = catchAsync(async (req, res, next) => {
  console.log('Cookie: ', req.cookies);
  let token;
  token = req.cookies.accessToken;

  if (token) {
    jwt.verify(token, config.jwt.accessSecret, (err, tokenRes) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.status(401);
          throw new Error('Unauthorized- Token has expired');
        } else {
          res.status(401);
          throw new Error('Unauthorized- ' + err.message);
        }
      }
      console.log('Protected Check this guy pass the test.');
      next();
    });
  }
});

export default { auth };
