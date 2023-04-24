import mongoose from 'mongoose';
import { g_appENV } from '../configs';
import { g_logENV } from '../constants';
import { Logger } from './logger';

class Database {
  private static instance: Database;

  constructor() {
    this.connect();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connect(options?: any) {
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

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
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

export const dbInstance = Database.getInstance();
