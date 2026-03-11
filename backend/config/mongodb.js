import mongoose from "mongoose";

// Global cache for serverless environments (Vercel)
let cachedConnection = global.mongoose;
if (!cachedConnection) {
  cachedConnection = global.mongoose = { conn: null, promise: null };
}

const connectdb = async () => {
    if (cachedConnection.conn) return cachedConnection.conn;

    if (!cachedConnection.promise) {
        mongoose.connection.on('connected', () => {
            console.log("DB Connected");
        });

        cachedConnection.promise = mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`).then((mongoose) => {
            return mongoose;
        });
    }

    cachedConnection.conn = await cachedConnection.promise;
    return cachedConnection.conn;
}

export default connectdb;