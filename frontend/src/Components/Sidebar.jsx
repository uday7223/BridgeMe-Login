import React from 'react'
import '../CSS/sidebar.css'
import { NavLink, useNavigate} from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout');
      navigate('/');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };
  
  
  return (
      <>
          <div className="sidebar">
        
                <div className="links">
                    <li><NavLink to="/adminportal/" style={({ isActive }) => {return isActive ? { color: "yellow" } : {};}}> <HomeOutlinedIcon className="icon" fontSize="medium" />Dashboard</NavLink></li>
                    <li><NavLink to="/adminportal/users" style={({ isActive }) => {return isActive ? { color: "yellow" } : {};}}> <CategoryOutlinedIcon className="icon"/>  Users </NavLink></li>
                    <li><NavLink to="/"><LogoutOutlinedIcon className="icon"/> <button onClick={handleLogout}>Log out</button> </NavLink></li>
                </div>

        </div>

      </>


  )
}

export default Sidebar