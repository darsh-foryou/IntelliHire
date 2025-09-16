"use client";

import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Timer, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

function ScheduledInterviews() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user) GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const { data, error } = await supabase
      .from("interviews")
      .select(
        "jobPosition,duration,interview_id,interview-feedback(userEmail,recommended)"
      )
      .eq("user", user?.email)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching interviews:", error.message);
      return;
    }

    setInterviewList(data || []);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-slate-50 p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
          Interviews with Candidate Feedback
        </h2>
        <p className="text-slate-500 mt-2">
          Browse your scheduled interviews, candidate performance, and recruiter
          recommendations.
        </p>
      </div>

      {interviewList.length === 0 ? (
        <div className="text-slate-500 text-center mt-10">
          No interviews found for your account.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interviewList.map((interview) => {
            const candidateCount =
              interview["interview-feedback"]?.length || 0;

            return (
              <Card
                key={interview.interview_id}
                onClick={() =>
                  router.push(`/scheduled-interview/${interview.interview_id}`)
                }
                className="cursor-pointer rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white via-sky-50 to-blue-100"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-blue-700">
                    {interview.jobPosition}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Timer className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">
                      Duration:{" "}
                      <span className="font-medium">
                        {interview.duration} mins
                      </span>
                    </span>
                  </div>

                  {candidateCount > 0 ? (
                    <div className="flex items-center gap-2 text-slate-700">
                      <Users className="h-5 w-5 text-green-600" />
                      <span className="text-sm">
                        Candidates:{" "}
                        <span className="text-blue-600 font-bold">
                          {candidateCount}
                        </span>
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm italic text-slate-400">
                      No candidates yet
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterviews;
