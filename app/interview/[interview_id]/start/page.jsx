
// "use client";

// import { InterviewDataContext } from "@/context/InterviewDataContext";
// import { Mic, PhoneOff, Timer, Video } from "lucide-react";
// import Image from "next/image";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { Button } from "@/components/ui/button";
// import Vapi from "@vapi-ai/web";
// import AlertComfirmation from "./_components/AlertComfirmation";
// import { toast } from "sonner";
// import axios from "axios";
// import { supabase } from "@/services/supabaseClient";
// import { useParams, useRouter } from "next/navigation";

// function StartInterview() {
//   const vapiRef = useRef(null);

//   // React state (UI only)
//   const [conversation, setConversation] = useState([]);
//   // Ref (always latest)
//   const conversationRef = useRef([]);

//   const { interviewInfo } = useContext(InterviewDataContext);
//   const [camOn, setCamOn] = useState(true);
//   const [activeUser, setActiveUser] = useState(false);
//   const { interview_id } = useParams();
//   const router = useRouter();

//   const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user",
//   };

//   const toggleCamera = () => setCamOn((prev) => !prev);

//   // ✅ Merge consecutive same-role messages
//   const mergeConversation = (conv) => {
//     const merged = [];
//     for (let msg of conv) {
//       if (merged.length > 0 && merged[merged.length - 1].role === msg.role) {
//         merged[merged.length - 1].text += " " + msg.text;
//       } else {
//         merged.push({ ...msg });
//       }
//     }
//     return merged;
//   };

//   // ✅ Generate Feedback
//   const GenerateFeedback = async (mergedConv) => {
//     try {
//       if (!mergedConv || mergedConv.length === 0) {
//         console.warn("⚠️ No conversation to send to feedback API.");
//         return;
//       }

//       const result = await axios.post("/api/ai-feedback", {
//         conversation: mergedConv,
//       });

//       const feedback = result.data.feedback;

//       // Save to Supabase
//       const { data, error } = await supabase
//         .from("interview-feedback")
//         .insert([
//           {
//             userName: interviewInfo?.userData?.name,
//             userEmail: interviewInfo?.userData?.email,
//             interview_id: interview_id,
//             feedback: feedback,
//             recommended: false,
//           },
//         ])
//         .select();

//       if (error) console.error("Supabase insert error:", error);
//       else console.log("✅ Saved feedback:", data);
//       console.log("redirecting...");

//       router.replace("/interview/"+interview_id+"/completed");
//     } catch (err) {
//       console.error("❌ Error generating feedback:", err);
//     }
//   };

//   // ✅ Initialize Vapi only once
//   useEffect(() => {
//     if (!vapiRef.current) {
//       vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

//       vapiRef.current.on("call-start", () => {
//         toast("Call connected..");
//       });

//       vapiRef.current.on("speech-start", () => {
//         console.log("AI SPEAKING");
//         setActiveUser(false);
//       });

//       vapiRef.current.on("speech-end", () => {
//         console.log("AI STOPPED");
//         setActiveUser(true);
//       });

//       vapiRef.current.on("message", (message) => {
//         if (message.type === "transcript") {
//           const newMsg = { role: message.role, text: message.transcript };

//           // React state (for UI)
//           setConversation((prev) => [...prev, newMsg]);
//           // Ref (always latest)
//           conversationRef.current = [...conversationRef.current, newMsg];
//         }
//       });

//       vapiRef.current.on("call-end", () => {
//         toast("Call ended.");
//         const merged = mergeConversation(conversationRef.current); // ✅ always has full convo
//         GenerateFeedback(merged);
//       });
//     }

//     return () => {
//       if (vapiRef.current) {
//         vapiRef.current.removeAllListeners();
//       }
//     };
//   }, []);

//   // ✅ Start the call when interviewInfo is ready
//   useEffect(() => {
//     if (interviewInfo) startCall();
//   }, [interviewInfo]);

//   const startCall = () => {
//     const questionsArray = interviewInfo?.interviewInfo?.questionList || [];
//     const questionL = questionsArray.map((q) => q.question).filter(Boolean).join(", ");

//     const assistantOptions = {
//       name: "AICRUITER",
//       firstMessage:
//         "Hi " +
//         interviewInfo?.userData?.name +
//         ", how are you doing today? Are you ready for your interview for the " +
//         interviewInfo?.interviewInfo?.jobPosition +
//         " role?",
//       transcriber: {
//         provider: "deepgram",
//         model: "nova-2-general", // ✅ cheaper than nova-2
//         language: "en",
//       },
//       voice: {
//         provider: "vapi",       // ✅ built-in, free/cheap
//         voiceId: "Kylie",     // ✅ safe fallback voice (no need for external IDs)
//       },
//       model: {
//         provider: "openai",
//         model: "gpt-4o-mini",   // ✅ much cheaper than GPT-4, still strong
//         messages: [
//           {
//             role: "system",
//             content: `
// You are an AI voice assistant conducting job interviews. Your role is to:

// 1. Greet the candidate with a **friendly and professional** tone.  
//    ➤ Example: "Hey there! Welcome to your ${interviewInfo?.interviewInfo?.jobPosition} interview. Let's dive into a few questions."

// 2. Ask questions one at a time from the list: ${questionL}
//    ➤ Wait for the user to respond before moving on.  
//    ➤ Questions should be clear, concise, and engaging.

// 3. After each answer:  
//    - Provide **brief, encouraging feedback**.  
//      ➤ Example: "Nice! That's a solid answer."  
//    - If incorrect or off-topic, **gently correct and guide** them.  
//      ➤ Example: "Hmm, not quite! Want to try again? (Hint: Think about how React tracks updates.)"

// 4. For each question, ask **2 follow-ups** based on the candidate’s response.  
//    ➤ Use GPT to generate follow-ups. Keep them relevant and progressive.  
//    ➤ Make it feel like a real conversation (e.g., "Let’s explore that a bit more…").

// 5. Keep the tone **natural and casual but professional**.  
//    ➤ Use phrases like "Alrighty, next up…" or "Let’s tackle a trickier one!"  
//    ➤ Show empathy and encourage effort, even if the answer isn't perfect.

// 6. After **80% of the questions are done** or if  **${interviewInfo?.interviewInfo?.duration} is **, smoothly wrap up:  
//    ➤ Example:  
//    "That was great! You handled some tough questions well. I’ll pass your answers and feedback to the recruiter, and they’ll reach out if it’s a good fit."

// 7. End with a friendly and positive message:  
//    ➤ "Thanks for chatting today! Is there anything else you’d like to share about this role or your experience?"

// **Key Notes for Voice Delivery**:
// - Keep your voice warm, conversational, and human-like.  
// - Pause naturally between questions and ask only 2 follow-ups.  
// - Make sure to wait for 5 seconds for a reply, and if the user is silent, try rephrasing or saying: 'Take your time, I'm here when you're ready.'
// - Wait for the candidate to answer. Only speak again if the user does not respond for more than 5 seconds.
// - If a candidate is struggling, offer hints or rephrase instead of skipping.  
// - Encourage retrying when appropriate.

// Your goal is to simulate a realistic, helpful, and enjoyable AI-led interview experience.
// `.trim(),
//           },
//         ],
//       },
//     };

//     vapiRef.current.start(assistantOptions);
//   };

//   // ✅ Manual end
//   const interviewKhatam = () => {
//     console.log("Manually ending the call...");
//     const merged = mergeConversation(conversationRef.current);
//     console.log("Merged conversation:", merged);
//     vapiRef.current.stop();
//   };

//   return (
//     <div className="w-full h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col">
//       {/* Header */}
//       <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shadow-sm">
//         <h2 className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
//           AI Interview Session
//         </h2>
//         <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-blue-50 border border-blue-200 shadow-sm">
//           <Timer className="h-5 w-5 text-blue-600" />
//           <span className="font-semibold text-blue-700">00:00:00</span>
//         </div>
//       </div>


//   );
// }

// export default StartInterview;



"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { PhoneOff, Timer, Video } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import AlertComfirmation from "./_components/AlertComfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const vapiRef = useRef(null);

  const [conversation, setConversation] = useState([]);
  const conversationRef = useRef([]);

  const { interviewInfo } = useContext(InterviewDataContext);
  const [camOn, setCamOn] = useState(true);
  const [activeUser, setActiveUser] = useState(false);
  const { interview_id } = useParams();
  const router = useRouter();

  // ✅ Timer state
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const toggleCamera = () => setCamOn((prev) => !prev);

  // ✅ Format seconds into hh:mm:ss
  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const mergeConversation = (conv) => {
    const merged = [];
    for (let msg of conv) {
      if (merged.length > 0 && merged[merged.length - 1].role === msg.role) {
        merged[merged.length - 1].text += " " + msg.text;
      } else {
        merged.push({ ...msg });
      }
    }
    return merged;
  };

  const GenerateFeedback = async (mergedConv) => {
    try {
      if (!mergedConv || mergedConv.length === 0) {
        console.warn("⚠️ No conversation to send to feedback API.");
        return;
      }

      const result = await axios.post("/api/ai-feedback", {
        conversation: mergedConv,
      });

      const feedback = result.data.feedback;

      const { data, error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userData?.name,
            userEmail: interviewInfo?.userData?.email,
            interview_id: interview_id,
            feedback: feedback,
            recommended: feedback.recommendation === "Yes",
          },
        ])
        .select();

      if (error) console.error("Supabase insert error:", error);
      else console.log("✅ Saved feedback:", data);

      clearInterval(timerRef.current); // ✅ stop timer

      router.replace("/interview/" + interview_id + "/completed");
    } catch (err) {
      console.error("❌ Error generating feedback:", err);
    }
  };

  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

      vapiRef.current.on("call-start", () => {
        toast("Call connected..");
        // ✅ Start timer
        setElapsedTime(0);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setElapsedTime((prev) => prev + 1);
        }, 1000);
      });

      vapiRef.current.on("speech-start", () => {
        console.log("AI SPEAKING");
        setActiveUser(false);
      });

      vapiRef.current.on("speech-end", () => {
        console.log("AI STOPPED");
        setActiveUser(true);
      });

      vapiRef.current.on("message", (message) => {
        if (message.type === "transcript") {
          const newMsg = { role: message.role, text: message.transcript };
          setConversation((prev) => [...prev, newMsg]);
          conversationRef.current = [...conversationRef.current, newMsg];
        }
      });

      vapiRef.current.on("call-end", () => {
        toast("Call ended.");
        clearInterval(timerRef.current); // ✅ stop timer
        const merged = mergeConversation(conversationRef.current);
        GenerateFeedback(merged);
      });
    }

    return () => {
      if (vapiRef.current) vapiRef.current.removeAllListeners();
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (interviewInfo) startCall();
  }, [interviewInfo]);

  const startCall = () => {
    const questionsArray = interviewInfo?.interviewInfo?.questionList || [];
    const questionL = questionsArray.map((q) => q.question).filter(Boolean).join(", ");

    const assistantOptions = {
      name: "AICRUITER",
      firstMessage:
        "Hi " +
        interviewInfo?.userData?.name +
        ", how are you doing today? Are you ready for your interview for the " +
        interviewInfo?.interviewInfo?.jobPosition +
        " role?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2-general", 
        language: "en",
      },
      voice: {
        provider: "vapi",       
        voiceId: "Kylie",     
      },
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting job interviews. Your role is to:

1. Greet the candidate with a **friendly and professional** tone.  
   ➤ Example: "Hey there! Welcome to your ${interviewInfo?.interviewInfo?.jobPosition} interview. Let's dive into a few questions."

2. Ask questions one at a time from the list: ${questionL}
   ➤ Wait for the user to respond before moving on.  
   ➤ Questions should be clear, concise, and engaging.

3. After each answer:  
   - Provide **brief, encouraging feedback**.  
     ➤ Example: "Nice! That's a solid answer."  
   - If incorrect or off-topic, **gently correct and guide** them.  
     ➤ Example: "Hmm, not quite! Want to try again? (Hint: Think about how React tracks updates.)"

4. For each question, ask **2 follow-ups** based on the candidate’s response.  
   ➤ Use GPT to generate follow-ups. Keep them relevant and progressive.  
   ➤ Make it feel like a real conversation (e.g., "Let’s explore that a bit more…").

5. Keep the tone **natural and casual but professional**.  
   ➤ Use phrases like "Alrighty, next up…" or "Let’s tackle a trickier one!"  
   ➤ Show empathy and encourage effort, even if the answer isn't perfect.

6. After **80% of the questions are done** or if  **${interviewInfo?.interviewInfo?.duration} is **, smoothly wrap up:  
   ➤ Example:  
   "That was great! You handled some tough questions well. I’ll pass your answers and feedback to the recruiter, and they’ll reach out if it’s a good fit."

7. End with a friendly and positive message:  
   ➤ "Thanks for chatting today! Is there anything else you’d like to share about this role or your experience?"

**Key Notes for Voice Delivery**:
- Keep your voice warm, conversational, and human-like.  
- Pause naturally between questions and ask only 2 follow-ups.  
- Make sure to wait for 5 seconds for a reply, and if the user is silent, try rephrasing or saying: 'Take your time, I'm here when you're ready.'
- Wait for the candidate to answer. Only speak again if the user does not respond for more than 5 seconds.
- If a candidate is struggling, offer hints or rephrase instead of skipping.  
- Encourage retrying when appropriate.

Your goal is to simulate a realistic, helpful, and enjoyable AI-led interview experience.
`.trim(),
          },
        ],
      },
    };

    vapiRef.current.start(assistantOptions);
  };

  const interviewKhatam = () => {
    console.log("Manually ending the call...");
    clearInterval(timerRef.current); // ✅ stop timer
    const merged = mergeConversation(conversationRef.current);
    console.log("Merged conversation:", merged);
    vapiRef.current.stop();
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shadow-sm">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
          AI Interview Session
        </h2>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-blue-50 border border-blue-200 shadow-sm">
          <Timer className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-blue-700">
            {formatTime(elapsedTime)}
          </span>
        </div>
      </div>
            {/* Main */}
      <div className="flex flex-1 gap-6 p-6">
        {/* AI Interviewer */}
        <div
          className={`flex-1 flex flex-col items-center justify-center rounded-2xl border bg-white p-6 transition-all duration-300 ${
            activeUser === false
              ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              : "border-slate-200 shadow"
          }`}
        >
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
            {activeUser === false && (
              <span className="absolute inset-0 rounded-full bg-blue-400 opacity-50 animate-ping z-0" />
            )}
            <Image
              src="/avatar1.png"
              alt="AI Interviewer"
              layout="fill"
              objectFit="cover"
              className="rounded-full relative z-10"
            />
          </div>
          <h3 className="font-semibold text-sm text-blue-600 mt-4 text-center">
            AI Interviewer
          </h3>
        </div>

        {/* Candidate */}
        <div
          className={`flex-1 flex flex-col items-center justify-center rounded-2xl border bg-white p-6 transition-all duration-300 ${
            activeUser === true
              ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              : "border-slate-200 shadow"
          }`}
        >
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
            {activeUser === true && (
              <span className="absolute inset-0 rounded-full bg-green-400 opacity-50 animate-ping z-0" />
            )}
            {camOn ? (
              <Webcam
                audio={false}
                videoConstraints={videoConstraints}
                className="rounded-full w-full h-full object-cover relative z-10"
              />
            ) : (
              <Image
                src="/avatar2.png"
                alt="Camera Off"
                layout="fill"
                objectFit="cover"
                className="rounded-full relative z-10"
              />
            )}
          </div>
          <h3 className="font-semibold text-sm text-blue-600 mt-4 text-center">
            {interviewInfo?.userData?.name || "Candidate"}
          </h3>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-center gap-6 py-4 border-t border-slate-200 bg-white shadow-inner">
        {/* Camera Toggle */}
        <Button
          onClick={toggleCamera}
          className={`flex items-center gap-2 rounded-full px-5 py-2 font-semibold shadow-md transition ${
            camOn
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
          }`}
        >
          <Video className="h-5 w-5" />
          {camOn ? "Camera On" : "Camera Off"}
        </Button>

        {/* End Call */}
        <AlertComfirmation stopInterview={() => interviewKhatam()}>
          <PhoneOff className="h-5 w-5" />
        </AlertComfirmation>
      </div>
    </div>
      
  );
}

export default StartInterview;
