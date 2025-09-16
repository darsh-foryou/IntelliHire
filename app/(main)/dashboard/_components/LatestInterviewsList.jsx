"use client";
import { Button } from "@/components/ui/button";
import { FileVideo, Plus, Copy, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { toast } from "sonner";

function LatestInterviewsList() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const GetInterviewList = async () => {
    let { data: interviews, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("user", user?.email)
      .order('id', {ascending:false})
      .limit(6);

    if (error) {
      console.error("Error fetching interviews:", error.message);
      return;
    }
    setInterviewList(interviews || []);
  };

  useEffect(() => {
    if (user?.email) {
      GetInterviewList();
    }
  }, [user]);

  // ✅ get app base URL dynamically
  const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
};

  // ✅ copy handler
  const copyToClipboard = (interviewId) => {
  toast("Copied to clipboard");
  const url = `${getBaseUrl()}/interview/${interviewId}`;
  navigator.clipboard.writeText(url);
};

const sendViaEmail = (interviewId) => {
  toast("Sending via email");
  const url = `${getBaseUrl()}/interview/${interviewId}`;
  const subject = encodeURIComponent("Interview Link");
  const body = encodeURIComponent(`Here’s your interview link: ${url}`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
};

  // ✅ calculate expiry date (30 days from created_at)
  const getExpiryDate = (createdAt) => {
    const created = new Date(createdAt);
    const expiry = new Date(created);
    expiry.setDate(created.getDate() + 30);
    return expiry.toLocaleDateString();
  };

  return (
    <div className="py-6">
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide mb-6">
        Previously Created Interviews
      </h2>

      {interviewList?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 rounded-xl shadow-inner">
          <FileVideo className="h-12 w-12 text-sky-600 mb-4" />
          <p className="text-gray-700 text-base font-medium mb-4">
            You don’t have any interview created!
          </p>
          <Button
            onClick={() => router.push("/dashboard/create-interviews")}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 cursor-pointer text-white shadow-md"
          >
            <Plus className="h-4 w-4" /> Create New Interview
          </Button>
        </div>
      )}

      {interviewList?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {interviewList.map((interview) => (
            <div
              key={interview.id}
              className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100 
                        hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 
                        bg-gradient-to-br from-white via-sky-50 to-blue-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileVideo className="h-8 w-8 text-sky-600 drop-shadow-md" />
                <h3 className="text-xl font-semibold text-gray-900">
                  {interview.jobPosition}
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                Type: <span className="font-medium">{interview.type}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Duration: {interview.duration} mins
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Created: {new Date(interview.created_at).toLocaleDateString()}
              </p>

              {/* ✅ show interview_id but copy full link */}
              <div className="flex items-center gap-2 mb-3">
                <p className="text-sm text-gray-700 font-mono">
                  {interview.interview_id}
                </p>
                <button
                  onClick={() => copyToClipboard(interview.interview_id)}
                  className="p-1 rounded-md hover:bg-sky-100 transition"
                  title="Copy Interview Link"
                >
                  <Copy className="h-4 w-4 text-sky-600" />
                </button>
                <button
                  onClick={() => sendViaEmail(interview.interview_id)}
                  className="p-1 rounded-md hover:bg-sky-100 transition"
                  title="Send via Email"
                >
                  <Send className="h-4 w-4 text-sky-600" />
                </button>
              </div>

              <p className="text-sm font-medium text-red-600">
                Expires on: {getExpiryDate(interview.created_at)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestInterviewsList;
