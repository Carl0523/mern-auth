import mongoose, { mongo } from "mongoose";

const connectMongo = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo connect at ${connect.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectMongo;
