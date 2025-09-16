// "use client";

// import { supabase } from "@/services/supabaseClient";
// import { useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Users, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";

// function Page() {
//   const { interview_id } = useParams();
//   const router = useRouter();
//   const [feedbackList, setFeedbackList] = useState([]);

//   useEffect(() => {
//     interview_id && GetInterviewDetails();
//   }, [interview_id]);

//   const GetInterviewDetails = async () => {
//     let { data: interviewF, error } = await supabase
//       .from("interview-feedback")
//       .select("userEmail, recommended,interviews(created_at,jobPosition,duration,jobDescription,type,questionList) ")
//       .eq("interview_id", interview_id);

//     if (error) {
//       console.error("Error fetching interview details:", error.message);
//       return;
//     }
//     console.log(interviewF);

//     setFeedbackList(interviewF || []);
//   };

//   // ✅ Compute stats
//   const totalCandidates = feedbackList.length;
//   const recommendedCount = feedbackList.filter((c) => c.recommended).length;
//   const recommendedPercent =
//     totalCandidates > 0 ? (recommendedCount / totalCandidates) * 100 : 0;

//   return (
//     <div className="p-8">

//         <div className="mb-6">
//         <Button
//           onClick={() => router.push("/scheduled-interview")}
//           variant="outline"
//           className="flex items-center gap-2"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back
//         </Button>
//       </div>
//       {/* Page Header */}
//       <h2 className="text-4xl font-extrabold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg mb-8">
//         Interview Candidate Feedback
//       </h2>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <Card className="shadow-md">
//           <CardHeader className="flex items-center gap-3">
//             <Users className="h-6 w-6 text-blue-600" />
//             <CardTitle>Total Candidates</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold text-gray-900">
//               {totalCandidates}
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="shadow-md">
//           <CardHeader className="flex items-center gap-3">
//             <CheckCircle2 className="h-6 w-6 text-green-600" />
//             <CardTitle>Recommended</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold text-green-600">
//               {recommendedCount}
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="shadow-md">
//           <CardHeader>
//             <CardTitle>Recommendation Rate</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Progress value={recommendedPercent} className="h-3" />
//             <p className="text-sm text-gray-600 mt-2">
//               {recommendedPercent.toFixed(0)}% candidates recommended
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Candidate List */}
//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle>Candidate List</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {feedbackList.length === 0 ? (
//             <p className="text-gray-600">No candidates have completed this interview yet.</p>
//           ) : (
//             <ul className="divide-y divide-gray-200">
//               {feedbackList.map((candidate, idx) => (
//                 <li
//                   key={idx}
//                   className="flex items-center justify-between py-4 px-2 hover:bg-slate-50 rounded-lg cursor-pointer transition"
//                   onClick={() =>
//                     router.push(
//                       `/scheduled-interview/${interview_id}/${candidate.userEmail}`
//                     )
//                   }
//                 >
//                   <span className="font-medium text-gray-900">
//                     {candidate.userEmail}
//                   </span>
//                   {candidate.recommended ? (
//                     <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1">
//                       <CheckCircle2 className="h-4 w-4" /> Recommended
//                     </Badge>
//                   ) : (
//                     <Badge className="bg-red-100 text-red-700 border-red-200 flex items-center gap-1">
//                       <XCircle className="h-4 w-4" /> Not Recommended
//                     </Badge>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Page;


"use client";

import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Timer,
  CalendarDays,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Page() {
  const { interview_id } = useParams();
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    let { data: interviewF, error } = await supabase
      .from("interview-feedback")
      .select(
        "userEmail, recommended, interviews(jobPosition,duration,jobDescription,type,questionList,created_at)"
      )
      .eq("interview_id", interview_id);

    if (error) {
      console.error("Error fetching interview details:", error.message);
      return;
    }

    setFeedbackList(interviewF || []);
  };

  // ✅ Compute stats
  const totalCandidates = feedbackList.length;
  const recommendedCount = feedbackList.filter((c) => c.recommended).length;
  const recommendedPercent =
    totalCandidates > 0 ? (recommendedCount / totalCandidates) * 100 : 0;

  // ✅ Extract interview info (same for all candidates)
  const interviewInfo = feedbackList[0]?.interviews;

  return (
    <div className="p-8 space-y-10">
      {/* Back Button */}
      <div>
        <Button
          onClick={() => router.push("/scheduled-interview")}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Interview Header */}
      {interviewInfo && (
        <Card className="shadow-lg border border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-700">
              {interviewInfo.jobPosition}
            </CardTitle>
            <p className="text-slate-600 mt-2">
              {interviewInfo.jobDescription || "No description provided."}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-6 text-sm text-slate-700">
              <span className="flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-blue-600" />
                <strong>Type:</strong> {interviewInfo.type}
              </span>
              <span className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-blue-600" />
                <strong>Duration:</strong> {interviewInfo.duration} mins
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-blue-600" />
                <strong>Created:</strong>{" "}
                {new Date(interviewInfo.created_at).toLocaleDateString()}
              </span>
            </div>

            {/* Questions Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="questions">
                <AccordionTrigger className="text-slate-800 font-medium">
                  View Question List
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
                    {interviewInfo.questionList?.map((q, i) => (
                      <li key={i}>
                        <span className="font-semibold capitalize">
                          [{q.type}]
                        </span>{" "}
                        {q.question}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-600" />
            <CardTitle>Total Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">
              {totalCandidates}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <CardTitle>Recommended</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {recommendedCount}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recommendation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={recommendedPercent} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">
              {recommendedPercent.toFixed(0)}% candidates recommended
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Candidate List */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Candidate List</CardTitle>
        </CardHeader>
        <CardContent>
          {feedbackList.length === 0 ? (
            <p className="text-gray-600">
              No candidates have completed this interview yet.
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {feedbackList.map((candidate, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between py-4 px-2 hover:bg-slate-50 rounded-lg cursor-pointer transition"
                  onClick={() =>
                    router.push(
                      `/scheduled-interview/${interview_id}/${candidate.userEmail}`
                    )
                  }
                >
                  <span className="font-medium text-gray-900">
                    {candidate.userEmail}
                  </span>
                  {candidate.recommended ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Recommended
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 border-red-200 flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> Not Recommended
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
