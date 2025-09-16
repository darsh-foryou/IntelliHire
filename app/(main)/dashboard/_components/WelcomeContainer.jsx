"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div className="px-4"> 
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-gray-50 via-white to-gray-100 shadow-md p-6">
        {/* Left side: Welcome text */}
        <div>
          <h2 className="text-2xl font-medium text-gray-800">
            Welcome Back,{" "}
            <span className="font-bold text-sky-600">
              {user?.name || "Guest"}
            </span>
          </h2>

          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
            AI-driven interviews, hassle free
          </h2>
        </div>

        {/* Right side: Profile image */}
        {user?.picture && (
          <Image
            src={user.picture}
            alt="user"
            width={50}
            height={50}
            className="rounded-full border-2 border-black shadow-sm object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default WelcomeContainer;
