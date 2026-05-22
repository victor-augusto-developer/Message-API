import { client } from "./whatsapp.service.js";
import { askAI } from "./ai.service.js";

client.on("message", async (msg) => {
    if (msg.from.includes("@g.us")) return;

    const text = msg.body;

    console.log("[MSG]", text);

    if (!text.toLowerCase().includes("bot")) return;

    const question = text.replace(/bot/i, "").trim();

    const reply = await askAI(question);

    await msg.reply(reply);
});