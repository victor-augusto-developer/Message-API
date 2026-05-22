import mongoose from "mongoose";

export async function connectDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB conectado");

    } catch (err) {

        console.log(err);

    }

}