import { connect } from "mongoose";
const connectDB = async () => {
  try {
    const dbInstance = await connect(`${process.env.MONGODB_URI}`);
    console.log("MONGODB Connected ----> ", dbInstance.connection.host);
  } catch (error) {
    console.log("MONGODB Failed ----> ", error);
    process.exit(1);
  }
};

export default connectDB;
