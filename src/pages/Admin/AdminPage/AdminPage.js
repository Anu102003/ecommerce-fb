import React, { useState } from 'react'
import { Sidebar } from '../SideBar/Sidebar';
import "./_adminPage.scss"
import { Outlet } from 'react-router-dom';
import { NavbarPopup } from '../../../assets/components/NavbarPopup/NavbarPopup';
export const AdminPage = () => {
  const [sidePopup, setSidePopup] = useState(false)
  return (
    <div className='admin-page-container'>
      <Sidebar sidePopup={sidePopup} setSidePopup={setSidePopup} />
      {
        sidePopup &&
        <NavbarPopup setNavPopup={setSidePopup} type="admin"/>
      }
      <div className='outlet-container'>
        <Outlet />
      </div>
    </div>
  )
}
