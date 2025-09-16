// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { supabase } from "@/services/supabaseClient";
// import { Clock, CheckCircle, Video } from "lucide-react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { toast } from "sonner";

// const InterviewPage = () => {
//     const [interviewDetails, setInterviewDetails] = useState();
//     const[userName, setUserName] = useState();
//     const[loading, setLoading] = useState(false)
//     const { interview_id } = useParams();
//     console.log(interview_id);
//     useEffect(() => {
//         const fetchDetails = async () => {
//             const details = await getInterviewDetail();
//             setInterviewDetails(details);
//         };
//         fetchDetails();
//     }, [interview_id])
//     const getInterviewDetail = async () => {
//         setLoading(true);
//         const { data, error } = await supabase
//             .from("interviews")
//             .select("jobPosition, jobDescription, duration")
//             .eq("interview_id", interview_id)
//             .single();

//         if (error) {
//            toast("Please check the interview link !");
//            setLoading(false);
//            return null;
//         }

//         console.log(data);
//         return data;
//     };

//     return (
//         <div className="pt-6 flex justify-center items-center">
//             <div
//                 className="flex flex-col items-center text-center
//         bg-gradient-to-b from-white to-slate-50
//         border border-slate-200 rounded-2xl
//         shadow-[0_8px_18px_-6px_rgba(2,132,199,0.25),0_2px_6px_rgba(15,23,42,0.1)]
//         transition p-8 w-full max-w-md sm:max-w-2xl"
//             >
//                 {/* Logo */}
//                 <Image
//                     src="/logo.png"
//                     alt="LOGO"
//                     height={60}
//                     width={60}
//                     className="w-[80px] h-auto rounded-full drop-shadow-sm"
//                 />

//                 {/* Main Heading */}
//                 <h2
//                     className="mt-4 text-3xl font-extrabold 
//           bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent
//           drop-shadow-sm"
//                 >
//                     Your AI Interviewer
//                 </h2>

//                 {/* Illustration */}
//                 <Image
//                     src="/interviewpage.png"
//                     alt="Interview Page"
//                     height={300}
//                     width={300}
//                     className="mt-4 w-[240px] h-auto drop-shadow-md"
//                 />

//                 {/* Subtitle */}
//                 <p className="mt-3 text-slate-600 text-base leading-relaxed max-w-sm">
//                     Powered by AI — smart, efficient, and personalized interviews designed
//                     to evaluate your skills with precision.
//                 </p>

//                 {/* Job Title */}
//                 <h3
//                     className="mt-3 text-lg font-extrabold
//           bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent
//           drop-shadow-sm"
//                 >
//                     {interviewDetails?.jobPosition}
//                 </h3>

//                 {/* Duration */}
//                 <div className="mt-2 flex items-center gap-1">
//                     <Clock className="h-4 w-4 text-blue-600 drop-shadow-sm" />
//                     <span
//                         className="text-sm font-semibold
//             bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent
//             drop-shadow-sm"
//                     >
//                         {interviewDetails?.duration} Mins
//                     </span> 
//                 </div>

//                 {/* Name Input */}
//                 <div className="w-full mt-6 text-left">
//                     <h2 className="font-semibold text-sm text-slate-700 mb-2">
//                         Enter Your Full Name
//                     </h2>
//                     <Input
//                         placeholder="Jane Doe"
//                         className="h-11 border-slate-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 shadow-sm"
//                     />
//                     <h2 className=" pt-2 font-semibold text-sm text-slate-700 mb-2">
//                         Enter Your Email Address
//                     </h2>
//                     <Input
//                         placeholder="janedoe@gmail.com"
//                         className="h-11 border-slate-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 shadow-sm"
//                     />
//                 </div>

//                 {/* Tips Card */}
//                 <div
//                     className="w-full mt-6 p-5 rounded-xl
//           bg-gradient-to-br from-sky-50 to-blue-50
//           border border-blue-200 shadow-[0_6px_12px_-4px_rgba(2,132,199,0.25)] text-left"
//                 >
//                     <h2 className="text-base font-semibold text-blue-700 mb-3">
//                         Before You Begin
//                     </h2>
//                     <ul className="space-y-2 text-sm text-slate-700">
//                         <li className="flex items-start gap-2">
//                             <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
//                             Ensure you have a stable internet connection.
//                         </li>
//                         <li className="flex items-start gap-2">
//                             <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
//                             Test your microphone and camera for clear communication.
//                         </li>
//                         <li className="flex items-start gap-2">
//                             <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
//                             Sit in a quiet environment with minimal distractions.
//                         </li>
//                         <li className="flex items-start gap-2">
//                             <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
//                             Be prepared with relevant experiences to share confidently.
//                         </li>
//                     </ul>
//                 </div>

//                 {/* Join Button */}
//                 <Button
//                     variant="outline"
//                     className="mt-6 px-6 py-2 rounded-xl border-blue-600 text-blue-600 font-semibold 
//                      hover:bg-blue-50 hover:text-blue-700 
//                      shadow-[0_2px_4px_rgba(2,132,199,0.25)] transition"
//                 >
//                     <Video />
//                     Join Interview
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default InterviewPage;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { supabase } from "@/services/supabaseClient";
import { Clock, CheckCircle, Video, Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const InterviewPage = () => {
    const{interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
    const [interviewDetails, setInterviewDetails] = useState(null);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const router = useRouter();

    const { interview_id } = useParams();

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("interviews")
                    .select("jobPosition, jobDescription, duration")
                    .eq("interview_id", interview_id)
                    .single();

                if (error || !data) {
                    setNotFound(true);
                    toast.error("Interview not found or expired.");
                } else {
                    setInterviewDetails(data);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
                setNotFound(true);
                toast.error("Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        if (interview_id) fetchDetails();
    }, [interview_id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-white">
                <Image src="/logo.png" alt="LOGO" width={70} height={70} className="mb-6" />
                <p className="text-blue-600 text-xl font-medium animate-pulse">
                    Fetching interview details...
                </p>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-6">
                <Image src="/logo.png" alt="LOGO" width={70} height={70} className="mb-6" />
                <h2 className="text-2xl font-bold text-red-600">Interview Not Found</h2>
                <p className="text-slate-600 mt-2 max-w-md">
                    The interview link you used may be invalid or expired. Please check the link or contact support.
                </p>
            </div>
        );
    }

    const onJoinInterview = async() => {
        setLoading(true);
        let { data: interviews, error } = await supabase
        .from('interviews')
        .select('*')
        .eq('interview_id', interview_id);
        console.log(interviews[0]);
        //fetch the data ( interview question from supabase store it and also store the username and email and pass the data as a context hook to vapi)
        const userDetails = {
            name: userName.trim(),
            email: email.trim(),
        };
        console.log("User Details JSON:", userDetails);

        setInterviewInfo({
            userData : userDetails,
            interviewInfo : interviews[0]
        });
       console.log("About to navigate with data:", {
  userData: userDetails,
  interviewInfo: interviews[0],
});
        toast.success("Joining interview...");

        router.push('/interview/'+interview_id+'/start');
        setLoading(false);
    }

    return (
        <div className="pt-6 flex justify-center items-center">
            <div className="flex flex-col items-center text-center bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-2xl shadow-[0_8px_18px_-6px_rgba(2,132,199,0.25),0_2px_6px_rgba(15,23,42,0.1)] transition p-8 w-full max-w-md sm:max-w-2xl">
                <Image src="/logo.png" alt="LOGO" height={60} width={60} className="w-[80px] h-auto rounded-full drop-shadow-sm" />
                <h2 className="mt-4 text-3xl font-extrabold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                    Your AI Interviewer
                </h2>
                <Image src="/interviewpage.png" alt="Interview Page" height={300} width={300} className="mt-4 w-[240px] h-auto drop-shadow-md" />
                <p className="mt-3 text-slate-600 text-base leading-relaxed max-w-sm">
                    Powered by AI — smart, efficient, and personalized interviews designed
                    to evaluate your skills with precision.
                </p>
                <h3 className="mt-3 text-lg font-extrabold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                    {interviewDetails?.jobPosition}
                </h3>
                <div className="mt-2 flex items-center gap-1">
                    <Clock className="h-4 w-4 text-blue-600 drop-shadow-sm" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                        {interviewDetails?.duration} Mins
                    </span>
                </div>
                <div className="w-full mt-6 text-left">
                    <h2 className="font-semibold text-sm text-slate-700 mb-2">
                        Enter Your Full Name
                    </h2>
                    <Input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Jane Doe"
                        className="h-11 border-slate-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 shadow-sm"
                    />
                    <h2 className=" pt-2 font-semibold text-sm text-slate-700 mb-2">
                        Enter Your Email Address
                    </h2>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="janedoe@gmail.com"
                        className="h-11 border-slate-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 shadow-sm"
                    />
                </div>
                <div className="w-full mt-6 p-5 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-blue-200 shadow-[0_6px_12px_-4px_rgba(2,132,199,0.25)] text-left">
                    <h2 className="text-base font-semibold text-blue-700 mb-3">
                        Before You Begin
                    </h2>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            Ensure you have a stable internet connection.
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            Test your microphone and camera for clear communication.
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            Sit in a quiet environment with minimal distractions.
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            Be prepared with relevant experiences to share confidently.
                        </li>
                    </ul>
                </div>
                <Button
                    variant="outline"
                    disabled={loading || !userName || !email}
                    className="mt-6 px-6 py-2 rounded-xl border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 hover:text-blue-700 shadow-[0_2px_4px_rgba(2,132,199,0.25)] transition"
                    onClick={() => onJoinInterview()}
                >
                    <Video className="mr-2" />
                    {loading && <Loader2/>}
                    Join Interview
                </Button>
            </div>
        </div>
    );
};

export default InterviewPage;
