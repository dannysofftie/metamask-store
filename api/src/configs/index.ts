import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export interface IConfigs {
  jwtSecret: string;
  mongoUri: string;
  port: string | number;
}

export const configs: IConfigs = {
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST_URI : process.env.MONGO_URI,
  port: process.env.PORT || 4200,
};
