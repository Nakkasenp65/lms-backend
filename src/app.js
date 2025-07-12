import express from 'express';
import router from './routes/v1/index.js';
import cors from 'cors';
import error from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import configurePassport from './config/passport.js';
import passport from 'passport';

const app = express();

app.use(helmet());

if (process.env.BASE_URL === 'http://localhost:3000') {
  const corsOptions = {
    origin: 'http://localhost:3001', // Replace with your Next.js frontend's exact origin
    credentials: true, // This is crucial for sending/receiving cookies
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Optional: specify allowed methods
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization', // Optional: specify allowed headers
  };

  app.use(cors(corsOptions));
}

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
configurePassport(passport);

// BASE_URL + /v1
app.use('/v1', router);

app.use(error.errorConverter);
app.use(error.errorHandler);

export default app;
