import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  try {
    const { conversation } = await req.json();
    console.log(conversation);

    // Validate the conversation
    if (!conversation || !Array.isArray(conversation) || conversation.length === 0) {

      return NextResponse.json({ error: "Missing or invalid conversation." }, { status: 400 });
    }

    // Create the final prompt by injecting the conversation
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation, null, 2)
    );

    const result = await model.generateContent(FINAL_PROMPT);
    let content = result.response.text() ?? "";

    // Remove markdown formatting if present
    content = content.replace(/```json/gi, "").replace(/```/g, "").trim();

    let feedback;
    try {
      feedback = JSON.parse(content);
      if (!feedback || typeof feedback !== "object" || !feedback.feedback) {
        throw new Error("Invalid JSON structure.");
      }
    } catch (err) {
      console.error("JSON parse error. Raw content:", content);
      return NextResponse.json({ error: "Model returned invalid JSON." }, { status: 502 });
    }

    return NextResponse.json(feedback, { status: 200 });
  } catch (e) {
    const message =
      e?.message || (typeof e === "string" ? e : "Failed to generate feedback");
    const status = /quota|rate/i.test(message) ? 429 : 500;
    console.error("Gemini API error:", message);
    return NextResponse.json({ error: message }, { status });
  }
}
