import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-1.5-pro"

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    // Basic input validation
    if (
      !jobPosition?.trim() ||
      !jobDescription?.trim() ||
      !duration ||
      !(Array.isArray(type) ? type.length > 0 : String(type || "").trim())
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const typesStr = Array.isArray(type) ? type.join(", ") : String(type);

    // Strong JSON-only prompt
    const prompt = `
You are a senior technical interviewer working for a hiring team. Your task is to generate a list of high-quality interview questions for a candidate applying to the given position.

Input:
- Job Title: ${jobPosition}
- Job Description: ${jobDescription}
- Interview Duration: ${duration} minutes
- Interview Type(s): ${type} 

Instructions:
1. Carefully analyze the job description to extract:
   - Core responsibilities
   - Required technical and soft skills
   - Experience level expectations
2. Based on the ${type} of interview provided generate question only based on the ${type}. Do NOT include questions of others types:
   - For **technical**: Create questions that evaluate core technical skills, tools, systems, and frameworks mentioned in the job description.
   - For **behavioral**: Generate scenario-based questions aligned with the candidate's role (consider STAR format).
   - For **resume**: Ask questions that allow the candidate to describe their experience with tools, platforms, and challenges similar to those in the job description.
   - For **problem solving**: Create realistic, mid-level scenarios requiring the candidate to apply key tools, logic, or domain knowledge to resolve problems.
   - For **leadership**: Frame questions based on **Amazon's Leadership Principles** (ownership, bias for action, earn trust, etc.) in data, engineering, or analytics settings.
3. Allocate questions based on time:
   - 5 minutes: ~2 - 3 questions
   - 15 minutes: ~4 - 5 questions
   - 30 minutes: ~8 - 10 questions
   - 45 minutes: ~10-12 questions
   - 60 minutes: ~12-15 questions
4. The questions must be:
   - Clean and realistic
   - Aligned with role seniority
   - Balanced across selected types
   - Actionable and directly askable

Output:
Return ONLY a valid JSON array of objects:
[
  { "question": "string", "type": "technical | behavioral | resume | problem solving | leadership" }
]
`;


    console.log(prompt);
    const result = await model.generateContent(prompt);
    let content = result.response.text() ?? "";

    // Clean possible code fences (belt & suspenders)
    content = content.replace(/```json/gi, "").replace(/```/g, "").trim();

    let questions = [];
    try {
      questions = JSON.parse(content);
      if (!Array.isArray(questions)) throw new Error("Not an array.");
    } catch (err) {
      console.error("Parse error. Raw content:", content);
      return NextResponse.json(
        { error: "Model returned invalid JSON" },
        { status: 502 }
      );
    }

    return NextResponse.json({ questions }, { status: 200 });
  } catch (e) {
    const message =
      e?.message || (typeof e === "string" ? e : "Failed to generate interview questions");
    const status = /quota|rate/i.test(message) ? 429 : 500;
    console.error("Gemini API error:", message);
    return NextResponse.json({ error: message }, { status });
  }
}
