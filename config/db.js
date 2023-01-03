import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL);

		console.log(`DB Connected!: ${conn.connection.host}`.yellow.underline.bold);
	} catch (err) {
		console.log(err);
	}
};

export default connectDB;
