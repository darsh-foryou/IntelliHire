"use client";

import React from "react";
import Link from "next/link";
import { Video, Phone } from "lucide-react";

function CreateOptions() {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-50 via-white to-gray-100 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Video Interview */}
        <Link
          href="/dashboard/create-interviews"
          className="flex items-start gap-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
            <Video className="h-6 w-6 text-sky-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Create New Interview
            </h3>
            <p className="text-sm text-gray-500">
              Create AI interviews and schedule them with candidates
            </p>
          </div>
        </Link>

        {/* Phone Screening */}
        <Link
          href="/dashboard/create-interviews"
          className="flex items-start gap-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
            <Phone className="h-6 w-6 text-sky-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Create Phone Screening Call
            </h3>
            <p className="text-sm text-gray-500">
              Schedule phone screening calls with potential candidates
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CreateOptions;
