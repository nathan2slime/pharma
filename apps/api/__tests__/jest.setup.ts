import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongodb: MongoMemoryServer;

beforeAll(async () => {
  mongodb = await MongoMemoryServer.create();
  await mongoose.connect(mongodb.getUri(), {});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongodb.stop();
});

afterEach(async () => {
  jest.clearAllMocks();
  await mongoose.connection.db.dropDatabase();
});
