"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function InterviewComplete() {
  const router = useRouter();

  return (
    <div className="w-full h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col items-center justify-center text-center px-6">
      {/* Icon + Message */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-10 max-w-lg w-full flex flex-col items-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 animate-bounce" />

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm mb-4">
          Interview Completed 🎉
        </h1>

        <p className="text-slate-600 text-lg leading-relaxed">
          Thank you for taking the interview with <span className="font-semibold text-slate-800">AI Recruiter</span>.  
          <br />
          Your responses have been recorded successfully, and feedback will be shared with the recruiter shortly.
        </p>
      </div>
    </div>
  );
}

export default InterviewComplete;
