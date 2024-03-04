export const runtime = "edge";
import OpenAI from "openai";
import { NextRequest } from "next/server";
import { generatePromptHelper } from "@/utils/ai";

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
});

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 }); // Method Not Allowed
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Invalid JSON",
      }),
      {
        status: 400, // Bad Request
      }
    );
  }

  if (!body.prompt) {
    return new Response(
      JSON.stringify({
        error: "A prompt need to be defined",
      }),
      {
        status: 400, // Bad Request
      }
    );
  }

  try {
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
      messages: generatePromptHelper(body.prompt),
    });

    // Just interested in one recipe per time
    return new Response(response.choices[0].message.content, {
      status: 200,
    });
  } catch (error) {
    return new Response(undefined, { status: 502 }); // Bad Gateway
  }
}
