import Joi from 'joi';
import { configDotenv } from 'dotenv';

configDotenv();

const envVarsSchema = Joi.object()
  .keys({
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    REFRESH_TOKEN_SECRET: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
    EMAIL_USERNAME: Joi.string().required(),
    EMAIL_APP_PASSWORD: Joi.string().required(),
    EMAIL_SENDER: Joi.string().required(),
    FRONTEND_URL: Joi.string().required(),
    BASE_URL: Joi.string().required(),
    BCRYPT_SALT_ROUNDS: Joi.number().required(),
    VERIFICATION_TOKEN_SECRET: Joi.string().required(),
    NODE_ENV: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  nodeEnv: envVars.NODE_ENV,
  mongo: {
    url: envVars.DATABASE_URL,
  },
  jwt: {
    accessSecret: envVars.ACCESS_TOKEN_SECRET,
    refreshSecret: envVars.REFRESH_TOKEN_SECRET,
    verification: envVars.VERIFICATION_TOKEN_SECRET,
  },
  email: {
    username: envVars.EMAIL_USERNAME,
    appPassword: envVars.EMAIL_APP_PASSWORD,
    sender: envVars.EMAIL_SENDER,
  },
  url: {
    front: envVars.FRONTEND_URL,
    base: envVars.BASE_URL,
  },
  salt: envVars.BCRYPT_SALT_ROUNDS,
};
