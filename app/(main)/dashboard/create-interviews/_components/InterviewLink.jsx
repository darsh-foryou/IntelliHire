// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Clock, Copy, ListChecks, CalendarClock, Mail, Slack, ArrowLeftIcon, Plus } from "lucide-react";
// import React, { useMemo } from "react";
// import { toast } from "sonner";
// import { MdEmail } from 'react-icons/md';
// import { FaWhatsapp, FaFacebook } from "react-icons/fa";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";




// function InterviewLink({ interview_id, formData }) {
//     const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
//     const link = `${baseUrl}/${interview_id}`;
//     const pathname = usePathname();
//     const router = useRouter();

//     const expiresOn = useMemo(() => {
//         const d = new Date();
//         d.setUTCDate(d.getUTCDate() + 15);
//         return new Intl.DateTimeFormat("en-US", {
//             year: "numeric",
//             month: "short",
//             day: "2-digit",
//             timeZone: "UTC",
//         }).format(d);
//     }, []);

//     return (
//         <div className="flex flex-col items-center justify-center mt-5">
//             <h2 className="font-extrabold text-2xl mt-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
//                 Your AI Interview is Ready!
//             </h2>
//             <p className="mt-1 text-slate-600 text-center max-w-md">
//                 Share this link with your candidates to start the process.
//             </p>

//             {/* Main card */}
//             <div className="w-full max-w-xl mt-6 p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-[0_10px_20px_-10px_rgba(2,132,199,0.25),0_4px_8px_rgba(15,23,42,0.1)] hover:shadow-[0_14px_28px_-10px_rgba(2,132,199,0.35),0_6px_12px_rgba(15,23,42,0.15)] transition">
//                 <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-semibold text-gray-900">Interview Link</h3>
//                     <span
//                         className="text-xs font-semibold px-3 py-1 rounded-full
//             bg-blue-600/10 text-blue-700 border border-blue-600/20
//             shadow-[0_2px_0_0_rgba(37,99,235,0.35)]"
//                     >
//                         Valid for 30 Days
//                     </span>
//                 </div>

//                 {/* Link + Copy */}
//                 <div className="mt-4 flex items-center justify-between gap-3">
//                     <Input
//                         className="text-gray-900 font-medium"
//                         value={link}
//                         readOnly
//                     />
//                     <button
//                         onClick={() => {
//                             navigator.clipboard.writeText(link);
//                             toast("Copied to clipboard.");
//                         }}
//                         className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
//                     >
//                         <Copy className="h-4 w-4" />
//                         <span>Copy</span>
//                     </button>
//                 </div>

//                 <hr className="my-6 border-slate-200" />

//                 {/* Info cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 border border-blue-100 shadow-[inset_0_-2px_4px_rgba(2,132,199,0.08)]">
//                         <Clock className="h-5 w-5 text-blue-600" />
//                         <div>
//                             <p className="text-xs text-slate-500">Duration</p>
//                             <p className="text-sm font-semibold text-gray-900">
//                                 {formData?.duration || 10} min
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 border border-blue-100 shadow-[inset_0_-2px_4px_rgba(2,132,199,0.08)]">
//                         <ListChecks className="h-5 w-5 text-blue-600" />
//                         <div>
//                             <p className="text-xs text-slate-500">Questions</p>
//                             <p className="text-sm font-semibold text-gray-900">
//                                 {Array.isArray(formData?.questions)
//                                     ? formData.questions.length
//                                     : 0}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 border border-blue-100 shadow-[inset_0_-2px_4px_rgba(2,132,199,0.08)]">
//                         <CalendarClock className="h-5 w-5 text-blue-600" />
//                         <div>
//                             <p className="text-xs text-slate-500">Expires</p>
//                             <p className="text-sm font-semibold text-gray-900">{expiresOn}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <hr className="my-6 border-slate-200" />

//                 <div className="mt-4">
//                     <h3 className="text-sm font-semibold text-slate-700 mb-2">Share via:</h3>
//                     <div className="flex flex-wrap gap-3">
//                         <Button
//                             variant="outline"
//                             className="flex items-center gap-2 border border-slate-300 hover:bg-slate-100 transition rounded-lg px-4 py-2"
//                         >
//                             <MdEmail className="text-blue-600 text-lg" />
//                             <span className="text-sm font-medium text-slate-800">Email</span>
//                         </Button>

//                         <Button
//                             variant="outline"
//                             className="flex items-center gap-2 border border-slate-300 hover:bg-slate-100 transition rounded-lg px-4 py-2"
//                         >
//                             <FaWhatsapp className="text-green-500 text-lg" />
//                             <span className="text-sm font-medium text-slate-800">WhatsApp</span>
//                         </Button>

//                         <Button
//                             variant="outline"
//                             className="flex items-center gap-2 border border-slate-300 hover:bg-slate-100 transition rounded-lg px-4 py-2"
//                         >
//                             <Slack className="text-purple-600 text-lg" />
//                             <span className="text-sm font-medium text-slate-800">Slack</span>
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="mt-6 flex flex-wrap gap-3">
//                     <Button asChild variant="secondary" className="flex items-center gap-2 px-4 py-2">
//                         <Link href="/dashboard">
//                             <ArrowLeftIcon className="h-4 w-4" />
//                             <span>Back to Dashboard</span>
//                         </Link>
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default InterviewLink;


"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Clock,
  Copy,
  ListChecks,
  CalendarClock,
  ArrowLeftIcon,
  Slack,
} from "lucide-react";
import React, { useMemo } from "react";
import { toast } from "sonner";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function InterviewLink({ interview_id, formData }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const link = `${baseUrl}/interview/${interview_id}`;
  const pathname = usePathname();
  const router = useRouter();
  console.log(formData);

  const expiresOn = useMemo(() => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() + 30);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    }).format(d);
  }, []);

  // ---- Share Handlers ----
  const shareText = encodeURIComponent(
    `Here's your AI Interview link: ${link}`
  );

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=AI Interview Invitation&body=${shareText}`;
  };

  const shareViaWhatsApp = () => {
    window.open(`https://wa.me/?text=${shareText}`, "_blank");
  };

  const shareViaSlack = () => {
    // Requires Slack installed. For production, better to integrate with Slack webhook/API.
    window.open(`slack://channel?team=<TEAM_ID>&id=<CHANNEL_ID>`, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h2 className="font-extrabold text-2xl mt-2 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
        Your AI Interview is Ready!
      </h2>
      <p className="mt-1 text-slate-600 text-center max-w-md">
        Share this link with your candidates to start the process.
      </p>

      {/* Main card */}
      <div className="w-full max-w-xl mt-6 p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-[0_10px_20px_-10px_rgba(2,132,199,0.25),0_4px_8px_rgba(15,23,42,0.1)] hover:shadow-[0_14px_28px_-10px_rgba(2,132,199,0.35),0_6px_12px_rgba(15,23,42,0.15)] transition">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Interview Link</h3>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full
            bg-blue-600/10 text-blue-700 border border-blue-600/20
            shadow-[0_2px_0_0_rgba(37,99,235,0.35)]"
          >
            Valid for 30 Days
          </span>
        </div>

        {/* Link + Copy */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <Input
            className="text-gray-900 font-medium"
            value={link}
            readOnly
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast("Copied to clipboard.");
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
          >
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </button>
        </div>

        <hr className="my-6 border-slate-200" />

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 border border-blue-100 shadow-[inset_0_-2px_4px_rgba(2,132,199,0.08)]">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs text-slate-500">Duration</p>
              <p className="text-sm font-semibold text-gray-900">
                {formData?.duration || 10} min
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 border border-blue-100 shadow-[inset_0_-2px_4px_rgba(2,132,199,0.08)]">
            <ListChecks className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs text-slate-500">Type</p>
              <p className="text-sm font-semibold text-gray-900">
                {formData?.type[0]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 border border-blue-100 shadow-[inset_0_-2px_4px_rgba(2,132,199,0.08)]">
            <CalendarClock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs text-slate-500">Expires</p>
              <p className="text-sm font-semibold text-gray-900">{expiresOn}</p>
            </div>
          </div>
        </div>

        <hr className="my-6 border-slate-200" />

        {/* Share Buttons */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Share via:</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={shareViaEmail}
              variant="outline"
              className="flex items-center gap-2 border border-slate-300 hover:bg-slate-100 transition rounded-lg px-4 py-2"
            >
              <MdEmail className="text-blue-600 text-lg" />
              <span className="text-sm font-medium text-slate-800">Email</span>
            </Button>

            <Button
              onClick={shareViaWhatsApp}
              variant="outline"
              className="flex items-center gap-2 border border-slate-300 hover:bg-slate-100 transition rounded-lg px-4 py-2"
            >
              <FaWhatsapp className="text-green-500 text-lg" />
              <span className="text-sm font-medium text-slate-800">WhatsApp</span>
            </Button>

            <Button
              onClick={shareViaSlack}
              variant="outline"
              className="flex items-center gap-2 border border-slate-300 hover:bg-slate-100 transition rounded-lg px-4 py-2"
            >
              <Slack className="text-purple-600 text-lg" />
              <span className="text-sm font-medium text-slate-800">Slack</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary" className="flex items-center gap-2 px-4 py-2">
            <Link href="/dashboard">
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InterviewLink;
