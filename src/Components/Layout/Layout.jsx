import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout({userData, logout}) {
  return (
    <div>
      <Navbar userData = {userData} logout = {logout}/>
      <div className="container">
        <Outlet/>
      </div>
    </div>
  )
}
