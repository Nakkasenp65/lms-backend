import { PrismaClient } from '@prisma/client';
import config from './config.js';
// import passport from 'passport';
import passportJWT, { ExtractJwt } from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const prisma = new PrismaClient();

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt.accessSecret;

export default (passport) => {
  passport.use(
    new JWTStrategy(opts,
      async (jwtPayload, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { id: jwtPayload.id },
          });
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          return done(err, false);
        }
      },
    ),
  );
};
