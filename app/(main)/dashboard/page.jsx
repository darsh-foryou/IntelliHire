import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewsList from './_components/LatestInterviewsList'

function Dashboard() {
  return (
    <div>
      {/* <WelcomeContainer /> */}
      <h2 className="my-6 text-4xl font-extrabold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
        Dashboard
      </h2>
      <CreateOptions />
      <LatestInterviewsList/>
    </div>
  )
}

export default Dashboard
