import { g_appENV } from './../configs/env';
import mongoose from 'mongoose';
import { Logger } from './logger';
import { g_logENV } from '../constants';

export const startMongoDb = (options?: mongoose.ConnectOptions) => {
  mongoose.set('strictQuery', false);
  console.log('g_appENV: ', g_appENV);

  mongoose
    .connect(g_appENV.mongodbUri, {
      user: g_appENV.mongoUser,
      pass: g_appENV.mongoPassword,
      ...options,
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log(`Connect to db`);
    })
    .catch((err: Error) => {
      // eslint-disable-next-line no-console
      console.log(`MongoDB connection error. Please make sure MongoDB is running.\n` + err);
      process.exit(1);
    });

  const db = mongoose.connection;

  db.on('error', (err: Error) => {
    Logger(g_appENV.logError as g_logENV).error('[MONGO]', err);
  });
};
