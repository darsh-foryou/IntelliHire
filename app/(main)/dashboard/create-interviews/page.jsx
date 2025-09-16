"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FormComponent from "./_components/FormComponent"; 
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";
import { useUser } from "@/app/provider";

function Page() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({}); 
  const{user} = useUser();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    // just to see updates while you build
    console.log("formData", formData);
  }, [formData]);


  const[interviewId, setInterviewId] = useState();
  const onGoToNext = () => {
  const isValid =
    Boolean(formData?.jobPosition?.trim()) &&
    Boolean(formData?.jobDescription?.trim()) &&
    Boolean(formData?.duration) &&
    Array.isArray(formData?.type) &&
    formData.type.length > 0;   // <-- must have at least 1 type

  if (!isValid) {
    toast("Please fill out all the information.");
    return;
  }

  setStep((s) => s + 1);
};

const onCreateLink = (interview_id) =>{
  setInterviewId(interview_id);
  setStep((s) => s + 1);
}

  return (
    <div className="mt-10 px-6">
      {/* Header */}
      <div className="flex items-center gap-4 text-blue-600">
        <Link href="/dashboard" className="flex items-center">
          <ArrowLeft className="h-6 w-6 cursor-pointer hover:text-blue-700 transition-colors duration-200" />
        </Link>
        <h2 className="font-bold text-2xl text-gray-900">Create New Interview</h2>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <Progress value={step * 33} className="h-3 w-full bg-slate-200 rounded-full overflow-hidden" />
      </div>

      {/* Form */}
      <div className="mt-6">
        {step == 1 ? <FormComponent onHandleInputChange={onHandleInputChange} GoToNext={() => onGoToNext()}/>: step == 2 ?<QuestionList formData = {formData} onCreateLink={(interview_id) => onCreateLink(interview_id)} /> : step == 3 ? <InterviewLink interview_id = {interviewId} formData = {formData} /> : null}
      </div>
    </div>
  );
}

export default Page;
