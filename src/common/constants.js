import * as dotenv from 'dotenv';
dotenv.config({});

export const REGION = process.env.REACT_APP_REGION;
export const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;
export const USER_POOL_WEB_CLIENT_ID =
  process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID;
