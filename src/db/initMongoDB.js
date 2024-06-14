import mongoose from 'mongoose';
import { env } from '../utils/env.js';
export async function initMongoDB() {
  try {
    const user = env('MONGODB_USER');
    const pas = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pas}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('😎 ~ initMongoDB ~ error:', error);
    throw error;
  }
}
