import "dotenv/config";
import express from "express";
import { connectDatabase } from "./database/connect.js";

const app = express();

await connectDatabase();

app.listen(3000, () => {
    console.log("Servidor rodando");
});