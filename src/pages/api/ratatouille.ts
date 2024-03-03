export const runtime = "edge";
import OpenAI from 'openai';
import { NextRequest } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
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
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: generatePromptHelper(body.prompt),
    });
 
    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    return new Response(
      undefined,
      { status: 502 }
    ); // Bad Gateway
  }
}
