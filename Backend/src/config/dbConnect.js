import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    const mongoDbConnection = await connect(process.env.CONNECTION_STRING);
    console.log(`Database Connected: ${mongoDbConnection.connection.host}`);
  } catch (error) {
    console.log(`Can't Connect DB:${error}`);
  }
};

export default dbConnect;
