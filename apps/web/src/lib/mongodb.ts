import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eloktantra';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  const opts = {
    bufferCommands: false,
  };

  if (!cached.promise) {
    // Primary connection (Atlas or Env)
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('Web App: Connected to MongoDB');
  } catch (e) {
    console.warn('Web App: MongoDB Primary failed, falling back to Local (127.0.0.1)');
    // Explicit fallback for robustness as requested by user
    cached.promise = mongoose.connect('mongodb://127.0.0.1:27017/eloktantra', opts);
    cached.conn = await cached.promise;
  }

  return cached.conn;
}

export default connectDB;
