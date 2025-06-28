import app from './app.js';
import { configDotenv } from 'dotenv';

configDotenv();

app.listen(3000, () => {
  if (process.env.BASE_URL === 'http://localhost:3000')
    console.log(`Development server is running on ${process.env.BASE_URL}`);
  else console.log(`This the real server: ${process.env.BASE_URL}`);
});
