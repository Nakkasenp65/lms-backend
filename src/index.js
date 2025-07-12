import app from './app.js';
import config from './config/config.js';
import { configDotenv } from 'dotenv';

configDotenv();

app.listen(3000, () => {
  if (process.env.BASE_URL === 'http://localhost:3000')
    console.log(`Development server is running on ${config.url.base}`);
  else console.log(`This the real server: ${config.url.base}`);
});
