import mongoose from 'mongoose';

import { log } from '../log';

const MONGODB_URI =
  process.env.DATABASE_URL || 'mongodb://localhost:27017/pharma';

export const database = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    
    log.success('Database connected');
  } catch (err) {
    log.error('Failed to connect to database:', err);
  }
};
