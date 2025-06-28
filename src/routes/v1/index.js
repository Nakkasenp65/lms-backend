import express from 'express';
import userRouter from './userRoute.js';
import authRouter from './authRoute.js';

const router = express.Router();

//BASE_URL/v1 + /user

const defaultRoutes = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
