import React from 'react'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import logo from '../Images/logo.png'
import '../CSS/navbar.css'
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <>
        
        <div className="navbar">
          
          <div className="logo flex">
            
            
          <NavLink to="/adminportal/"><h1 className="text-center font-sans text-black text-4xl pt-3">BRIDGEME</h1>
          </NavLink>

            
          </div>
          <div className="links"><AccountCircleSharpIcon/> {/* <KeyboardCommandKeyRoundedIcon/>*/}             
          </div>
        
        </div>
    
    </>
)
}

export default Navbar