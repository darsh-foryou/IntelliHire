"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import {
    Loader2,
    Cpu,
    MessageSquare,
    FileText,
    Puzzle,
    Crown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";

function QuestionList({ formData , onCreateLink }) {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const calledOnce = useRef(false);
    const[saveLoading, setSaveLaoding] = useState(false);
    const { user } = useUser();
    useEffect(() => {
        if (calledOnce.current) return;
        calledOnce.current = true;
        generateQuestionList();
    }, []);

    const generateQuestionList = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/api/ai-model", formData);
            console.log("AI JSON:", res.data);
            setQuestions(res.data?.questions || []);
        } catch (e) {
            const status = e?.response?.status;
            if (status === 429) {
                toast("Rate limit hit. Please try again shortly.");
            } else {
                toast("Server error. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (indexToRemove) => {
        setQuestions((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    const onFinish = async () => {
        setSaveLaoding(true);
        const interviewId = uuidv4();
        const payload = {
            ...formData,
            questionList: questions,
            user: user?.email,
            interview_id: interviewId,
            type: Array.isArray(formData.type)
                ? formData.type.join(", ")
                : formData.type,
        };

        console.log("Payload to insert:", payload);

        const { data, error } = await supabase
            .from("interviews")
            .insert([payload])
            .select();
        if (error) {
            console.error("Insert error:", error.message || error);
        } else {
            toast.success("Interview created!");
        }




        setSaveLaoding(false);
        onCreateLink(interviewId);
    }

    // icon + badge tint map
    const typeMeta = {
        technical: {
            icon: Cpu,
            badge:
                "bg-blue-600/10 text-blue-700 border border-blue-600/20 shadow-[0_2px_0_0_rgba(37,99,235,0.35)]",
        },
        behavioral: {
            icon: MessageSquare,
            badge:
                "bg-emerald-600/10 text-emerald-700 border border-emerald-600/20 shadow-[0_2px_0_0_rgba(5,150,105,0.35)]",
        },
        resume: {
            icon: FileText,
            badge:
                "bg-violet-600/10 text-violet-700 border border-violet-600/20 shadow-[0_2px_0_0_rgba(124,58,237,0.35)]",
        },
        "problem solving": {
            icon: Puzzle,
            badge:
                "bg-amber-600/10 text-amber-700 border border-amber-600/20 shadow-[0_2px_0_0_rgba(217,119,6,0.35)]",
        },
        leadership: {
            icon: Crown,
            badge:
                "bg-rose-600/10 text-rose-700 border border-rose-600/20 shadow-[0_2px_0_0_rgba(225,29,72,0.35)]",
        },
    };

    return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
            {loading ? (
                <div className="flex flex-col items-center text-center space-y-3">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                        Generating Interview Questions
                    </h2>
                    <p className="text-sm text-slate-500 max-w-sm">
                        Our AI is crafting personalized questions…
                    </p>
                </div>
            ) : questions.length > 0 ? (
                <div>
                    <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                        Generated Questions
                    </h2>
                    <ul className="space-y-4">
                        {questions.map((q, i) => {
                            const kind = (q.type || "").toLowerCase();
                            const meta =
                                typeMeta[kind] || {
                                    icon: FileText,
                                    badge:
                                        "bg-slate-200 text-slate-700 border border-slate-300 shadow-[0_2px_0_0_rgba(15,23,42,0.15)]",
                                };
                            const Icon = meta.icon;

                            return (
                                <li
                                    key={i}
                                    className="
                    group relative rounded-xl p-4
                    bg-gradient-to-b from-white to-slate-50
                    border border-slate-200
                    shadow-[0_10px_20px_-10px_rgba(2,132,199,0.25),0_2px_6px_rgba(15,23,42,0.08)]
                    hover:shadow-[0_16px_30px_-10px_rgba(2,132,199,0.35),0_4px_12px_rgba(15,23,42,0.12)]
                    transition-transform duration-200
                    hover:-translate-y-0.5
                  "
                                >
                                    <span className="pointer-events-none absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-sky-400 to-blue-600 opacity-80" />

                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 pr-2">
                                            <div
                                                className="
                          mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg
                          bg-sky-50 text-blue-600
                          ring-1 ring-inset ring-blue-100
                          shadow-[inset_0_-2px_4px_rgba(2,132,199,0.12)]
                        "
                                            >
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <p className="text-gray-900 font-medium leading-relaxed">
                                                {q.question}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
                                            <Badge
                                                className={`${meta.badge} px-2.5 py-1 text-xs font-semibold rounded-full capitalize`}
                                                variant="secondary"
                                            >
                                                {kind || "other"}
                                            </Badge>
                                            <button
                                                onClick={() => handleDelete(i)}
                                                className="
                          px-2 py-1 text-xs font-medium rounded-md
                          text-red-600 border border-red-200 hover:bg-red-50
                          transition-colors duration-200
                        "
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Final Button */}
                    <div className="pt-6 text-center">
                        <Button onClick={() => onFinish()} disabled = {saveLoading}>Generate Interview Link</Button>
                        {saveLoading && <Loader2 className='animate-spin'/>}
                    </div>
                </div>
            ) : (
                <p className="text-slate-500 italic text-center">
                    No questions generated yet.
                </p>
            )}
        </div>
    );
}

export default QuestionList;
