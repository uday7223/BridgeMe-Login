import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard'
import Register from './Register'
import Users from './Users'

const Adminportal = () => {
  return (

    <>
     <Navbar/>
     <Sidebar/>
    
            <Routes>
            <Route path="/users" element={<Users/>} />

                <Route path="/" element={<Dashboard/>} />

                <Route path="/register" element={<Register/>} />


            </Routes> 


    
    </>


)
}

export default Adminportal