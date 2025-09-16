"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InterviewType } from "@/services/Constants";
import { Button } from "@/components/ui/button";

function FormComponent({ onHandleInputChange , GoToNext }) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  // notify parent whenever selection changes
  useEffect(() => {
    onHandleInputChange?.("type", selectedTypes);
  }, [selectedTypes]);

  // toggle add/remove (no duplicates)
  const toggleType = useCallback((title) => {
    setSelectedTypes((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  }, []);

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6">
      {/* Job Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="jobTitle">Job Title</label>
        <Input
          id="jobTitle"
          type="text"
          placeholder="e.g., Full-Stack Developer"
          className="h-10 border-slate-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
          onChange={(e) => onHandleInputChange?.("jobPosition", e.target.value)}
        />
      </div>

      {/* Job Description */}
      <div className="space-y-2 mt-5">
        <label className="text-sm font-medium text-slate-700" htmlFor="jobDesc">Job Description</label>
        <Textarea
          id="jobDesc"
          placeholder="Paste or write the job description…"
          className="min-h-[160px] border-slate-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
          onChange={(e) => onHandleInputChange?.("jobDescription", e.target.value)}
        />
      </div>

      {/* Duration */}
      <div className="space-y-2 mt-5">
        <label className="text-sm font-medium text-slate-700">Interview Duration</label>
        <Select onValueChange={(value) => onHandleInputChange?.("duration", value)}>
          <SelectTrigger className="w-full h-10 border-slate-300 focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 minutes</SelectItem>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="45">45 minutes</SelectItem>
            <SelectItem value="60">60 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Types */}
      <div className="space-y-2 mt-5">
        <label className="text-sm font-medium text-slate-700">Interview Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {InterviewType.map(({ title, icon: Icon }) => {
            const selected = selectedTypes.includes(title);
            return (
              <button
                key={title} // stable key
                type="button"
                onClick={() => toggleType(title)}
                aria-pressed={selected}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition
                  hover:border-blue-500 hover:bg-blue-50
                  ${selected ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-300 text-slate-700"}`}
              >
                <Icon className="h-4 w-4" />
                {title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button  onClick={GoToNext} className="bg-blue-600 text-white hover:bg-blue-700 shadow-md px-6 py-2 rounded-xl transition">
          Generate Questions
        </Button>
      </div>
    </div>
  );
}

export default FormComponent;
