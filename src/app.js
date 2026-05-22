import dotenv from "dotenv";

dotenv.config();

import express from "express";

import { StartWhatsApp } from "./services/whatsapp.service.js";


const app = express();

app.use(express.json());


app.get("/", (req, res) => {

    return res.status(200).json({
        online: true
    });

});


const PORT = process.env.PORT || 3000;


async function StartServer() {

    await StartWhatsApp();


    app.listen(PORT, "0.0.0.0", () => {

        console.log(
            `Servidor rodando na porta ${PORT}`
        );

    });

}

StartServer();