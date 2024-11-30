import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  organization: process.env.VITE_OPENAI_ORGANIZATION,
  project: process.env.VITE_OPENAI_PROJECT,
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const fetchGPTResponse = async (
  systemInstruction,
  userInstruction,
  model = "gpt-4o-mini"
) => {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userInstruction },
      ],
      max_tokens: 2000,
      response_format: {
        type: "json_object",
      },
    });

    console.log(response);

    const gptResponse = response.choices[0].message.content;
    console.log(gptResponse);
    const jsonObject = JSON.parse(gptResponse);
    console.log(jsonObject);

    if (jsonObject === null) {
      console.error("Error parsing JSON object");
      return { error: "Error parsing JSON object." };
    } else {
      return jsonObject;
    }
  } catch (error) {
    console.error("Error generating response:", error);
    return { error: `Error generating response: ${error}` };
  }
};
