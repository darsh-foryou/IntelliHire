import {SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import {AppSideBar} from './_components/AppSideBar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

const DashboardProvider = ({children}) => {
  return (
    <SidebarProvider>
        <AppSideBar/>
    <div className='w-full'>
        {/* <SidebarTrigger/> */}
        <WelcomeContainer/>
        {children}
    </div>
    </SidebarProvider>
  )
}

export default DashboardProvider
