import React from 'react'
import './Header.css'
import pic from './logo.jpg';
import SearchIcon from '@mui/icons-material/Search';
//import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Headeroption from './Headeroption';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotiIcon from '@mui/icons-material/Notifications';
//import MeIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/userSlice';
import { auth } from './firebasefile';

function Header() {
  
  const dispatch = useDispatch();
  const logoutOfApp = () =>{
    dispatch(logout());
    auth.signOut();
  };

  return (
    <>
    <div className='header'>
        <div className='header_left'>
        <img src={pic} alt="logo" /> 
          <div className='header_search'>
            <SearchIcon/>
              <input placeholder='search' type='text'/>
          </div>

        </div>
        <div className='header_right'>
              
        <Headeroption Icon={HomeIcon} title="Home"/>
        <Headeroption Icon={SupervisorAccountIcon} title="Network"/>
        <Headeroption Icon={BusinessCenterIcon} title="Jobs"/>
        <Headeroption Icon={ChatIcon} title="Messages"/>
        <Headeroption Icon={NotiIcon} title="Notifications"/>
        <Headeroption avatar={true} title="Profile" onClick={logoutOfApp}/>


        </div>
    </div>
    </>
  )
}

export default Header;