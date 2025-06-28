import express from 'express';
import router from './routes/v1/index.js';
import cors from 'cors';
import error from './middlewares/error.js';

const app = express();

if (process.env.BASE_URL === 'http://localhost:3000') {
  console.log('- Using cors()');
  app.use(cors());
}

app.use(express.json());

// BASE_URL + /v1
app.use('/v1', router);

app.use(error.errorConverter);
app.use(error.errorHandler);

export default app;
