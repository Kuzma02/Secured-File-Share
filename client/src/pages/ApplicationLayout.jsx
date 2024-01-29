import { useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ApplicationTabs } from '../components'

const ApplicationLayout = () => {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) {
      toast.warn("You need to be logged in to access this page");
      navigate("/")
    }
  }, [userId]);

  if (!isLoaded) return "Loading..."
  return (
    <div className="p-5 px-8 md:px-28 max-sm:px-2">
    <ApplicationTabs />
    <Outlet />
    </div>
  )
}

export default ApplicationLayout