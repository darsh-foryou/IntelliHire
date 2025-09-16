import React from 'react'
import DashboardProvider from './provider'
import { Toaster } from '@/components/ui/sonner'

const DashboardLayout = ({children}) => {
  return (
    <div>
        <DashboardProvider>
        <div className='p-5'>
        {children}
        <Toaster/>
        </div>
        </DashboardProvider>
    </div>
  )
}

export default DashboardLayout
