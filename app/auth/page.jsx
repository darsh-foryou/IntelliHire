'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/services/supabaseClient';

const Page = () => {
  const signinWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`, 
      },
    });
    if (error) console.error('Error: ', error.message);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-violet-100 via-white to-blue-100 text-gray-800">
      <div className="p-6">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="IntelliHire Logo"
            width={120}
            height={60}
            className="rounded-full bg-white p-1 shadow-md cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex flex-1 justify-center items-center">
        <Card className="w-full max-w-md shadow-lg border border-violet-200 bg-white rounded-2xl">
          <CardContent className="p-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/login.png"
                alt="IntelliHire Login Visual"
                width={100}
                height={100}
                className="rounded-xl border border-gray-200 shadow-sm"
              />
            </div>

            <h1 className="text-3xl font-bold text-violet-700 text-center mb-4">
              Welcome to IntelliHire
            </h1>
            <p className="text-gray-500 text-sm text-center mb-6">
              Sign in to access your AI interview assistant
            </p>

            <Button
              className="w-full mt-6 bg-violet-500 hover:bg-violet-600 text-white rounded-xl flex gap-2 items-center justify-center"
              onClick={signinWithGoogle}
            >
              <LogIn className="w-5 h-5" />
              Login with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
