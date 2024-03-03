export const runtime = "edge";
import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
import { generatePromptHelper } from "@/utils/ai";

const genAI = new GoogleGenerativeAI(
  process.env.AI_KEY as string
);

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
    const geminiStream = await genAI
      .getGenerativeModel({ model: "gemini-pro" })
      .generateContentStream(generatePromptHelper(body.prompt));

    // Convert the response into a friendly text-stream
    const stream = GoogleGenerativeAIStream(geminiStream);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    return new Response(
      undefined,
      { status: 502 }
    ); // Bad Gateway
  }
}
