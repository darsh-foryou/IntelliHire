"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function CandidateFeedbackPage() {
  const { interview_id, userEmail } = useParams();
  const decodedEmail = decodeURIComponent(userEmail);
  const [feedback, setFeedback] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFeedback = async () => {
      let { data, error } = await supabase
        .from("interview-feedback")
        .select("*")
        .eq("interview_id", interview_id)
        .eq("userEmail", decodedEmail);

      if (error) {
        console.error("Error fetching feedback:", error.message);
      } else {
        setFeedback(data[0]);
      }
    };

    fetchFeedback();
  }, [interview_id, decodedEmail]);

  if (!feedback) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading candidate feedback...
      </div>
    );
  }

  const { userName, userEmail: email, created_at, feedback: fb } = feedback;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Back Button */}
      <Button
        onClick={() => router.push(`/scheduled-interview/${interview_id}`)}
        variant="outline"
        className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Interview Stats
      </Button>

      {/* Header */}
      <Card className="shadow-lg border border-slate-200 bg-gradient-to-br from-white to-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold text-blue-700">
            {userName} <span className="text-gray-600">({email})</span>
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Interview Date: {new Date(created_at).toLocaleDateString()}
          </p>
        </CardHeader>
      </Card>

      {/* Ratings (out of 10) */}
      <Card className="shadow-lg border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Skill Ratings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(fb.rating).map(([skill, value]) => (
            <div key={skill} className="space-y-1">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span className="capitalize">{skill}</span>
                <span>{value} / 10</span>
              </div>
              <Progress value={(value / 10) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className="shadow-lg border border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-2">
            <Badge
              variant={fb.recommendation === "Yes" ? "default" : "destructive"}
              className="px-3 py-1 text-sm"
            >
              {fb.recommendation}
            </Badge>
            <span className="text-gray-600 text-sm">
              {fb.recommendationMsg}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="shadow-lg border border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Interview Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{fb.summary}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default CandidateFeedbackPage;
