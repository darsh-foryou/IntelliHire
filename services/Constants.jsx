import { BriefcaseBusinessIcon, Calendar, CircleDollarSign, Database, Handshake, LayoutDashboard, ListCheckIcon, LucideCode2, Puzzle, Settings, UserCheck, UserCheckIcon, UserCog, Wallet } from "lucide-react";

export const SideBarOptions = [
    {
    name : 'Dashboard',
    icon: LayoutDashboard,
    path : '/dashboard'
    },
    {
    name : 'Scheduled Interview',
    icon: Calendar,
    path : '/scheduled-interview'
    },
    {
    name : 'All Interviews',
    icon: ListCheckIcon,
    path : '/all-interview'
    },
    // {
    // name : 'Billing',
    // icon: Wallet,
    // path : '/billing'
    // },
    // {
    // name : 'Setting',
    // icon: Settings,
    // path : '/settings'
    // },
]

export const InterviewType = [
    {
        title : 'Technical',
        icon : LucideCode2
    },
    {
        title : 'Behavioral',
        icon : UserCheckIcon
    },
    {
        title : 'Resume',
        icon : BriefcaseBusinessIcon
    },
    {
        title : 'Problem Solving',
        icon : Puzzle
    },
    {
        title : 'Leadership',
        icon : UserCog
    }
]

export const QuestionPrompt = `You are a senior technical interviewer working for a hiring team. Your task is to generate a list of high-quality interview questions for a candidate applying to the given position.

Input:
- Job Title: {{jobPosition}}
- Job Description: {{jobDescription}}
- Interview Duration: {{duration}} minutes
- Interview Type(s): {{type}} 

Instructions:
1. Carefully analyze the job description to extract:
   - Core responsibilities
   - Required technical and soft skills
   - Experience level expectations
2. Based on the types{type} of interview provided:
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
]`
export const FEEDBACK_PROMPT = `You are an AI interviewer evaluator.

Given the full conversation {{conversation}} between an AI assistant and a user during a mock interview, analyze the user's responses and provide structured feedback.

Please return a JSON response with the following fields:

{
  "feedback": {
    "rating": {
      "technicalSkills": <1–10>,
      "communication": <1–10>,
      "problemSolving": <1–10>,
      "experience": <1–10>
    },
    "summary": "<Concise summary in 2–3 lines highlighting strengths and areas of improvement.>",
    "recommendation": "<Yes or No>",
    "recommendationMsg": "<One-liner indicating if the candidate should be recommended for hiring and why.>"
  }
}`;