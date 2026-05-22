import axios from "axios";


export async function GenerateAIResponse(message) {

    try {

        const response = await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {

                model: process.env.OPENROUTER_MODEL,

                messages: [

                    {
                        role: "system",
                        content:
                            "Você é um assistente inteligente do WhatsApp."
                    },

                    {
                        role: "user",
                        content: message
                    }

                ]

            },

            {

                headers: {

                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type": "application/json"

                }

            }

        );

        return response
            .data
            .choices[0]
            .message
            .content;

    } catch (error) {

    }
}