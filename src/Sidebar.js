import React from 'react'
import './Sidebar.css';
import cover from './cover.jpg';
import { Avatar } from '@mui/material';
//import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function Sidebar() {

    const user = useSelector(selectUser);
  /*  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
    const handleEdit = () => {
        setEditing(true);
      };
    
      const handleSave = () => {
        // Save the updated user details here
        // You can use Firebase or any other backend service to update the user details
        // After saving, set the editing state to false
        setDisplayName(displayName);
  setEmail(email);
        setEditing(false);
      };

      const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
      };
    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };*/
    const recentitem = (topic) =>(
    <div className='sidebar_recentitem'>
        <span className='sidebar_hash'>#</span>
        <p>{topic}</p>
    </div>
    );

  /*  const [buttonContent, setButtonContent] = useState("Initial Content");

  const handleButtonClick = () => {
    const newButtonContent = prompt("Enter a new value for the button:");

    if (newButtonContent && newButtonContent.trim() !== "") {
      setButtonContent(newButtonContent);
    }
  };*/
      

    /*  const customButton = (title) => (
        <div
          className="sidebar_button"
          onClick={() => handleButtonClick(title)}
        >
          <p>{title}</p>
        </div>
      );*/

  return (
    <div className='sidebar'>
        <div className='sidebar_top'>
            <img src={cover} alt=''/>
            <Avatar src={user.photoUrl} className='sidebar_avatar'>
                {user.email[0]}
            </Avatar>
            <h2>{user.displayName}</h2>
            <h4>{user.email}</h4>
            
        </div>

        <div className='sidebar_stats'>
            <div className='sidebar_stat'>
                <p>Who viewed you</p>
                <p className='sidebar_statNumber'>
                    2,543
                </p>
            </div>
            <div className='sidebar_stat'>
            <p>Views on post</p>
                <p className='sidebar_statNumber'>
                    2,448
                </p>
            </div>
        </div>
        <div className='sidebar_button'>
            <p>Recent</p>
            {recentitem('reactjs')}
            {recentitem('programming')}
            {recentitem('developer')}
            {recentitem('software')}
            {recentitem('design')}
        </div>
       
        
    </div>
  )
}

export default Sidebar;