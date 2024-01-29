import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ApplicationTabs = () => {
  const [ currentTab, setCurrentTab ] = useState(1);
  return (
    <div role="tablist" className="tabs tabs-boxed">
    <Link to="/app" role="tab" className={`tab ${currentTab === 1 && "bg-blue-500 text-white"}`} onClick={() => setCurrentTab(1)}>
      Send File
    </Link>
    <Link to="/app/user-profile" role="tab" className={`tab ${currentTab === 3 && "bg-blue-500 text-white"}`} onClick={() => setCurrentTab(3)}>
      User Profile
    </Link>
  </div>
  )
}

export default ApplicationTabs