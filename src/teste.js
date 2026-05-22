import dotenv from "dotenv";

dotenv.config();

import { GenerateAIResponse } from "./services/ai.service.js";

console.log(process.env.OPENROUTER_API_KEY);

const response = await GenerateAIResponse(
    "Explique o que é JavaScript, em portugues!"
);

console.log(response);