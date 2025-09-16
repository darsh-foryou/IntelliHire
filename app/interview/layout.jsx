"use client";
import React, { useState } from 'react'
import Header from './_components/Header'
import { Toaster } from "sonner";
import {InterviewDataContext} from '@/context/InterviewDataContext';

function InterviewLayout({children}) {
  const [interviewInfo, setInterviewInfo] = useState();
  return (
    <InterviewDataContext.Provider value={{interviewInfo, setInterviewInfo}}>
    <div>
        <Header/>
        {children}
        <Toaster/>
    </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout
