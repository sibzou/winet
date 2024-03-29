import React from 'react';
import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Topbar(props){
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">Winet</span>
            </div>

            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className="searchIcon"/>
                    <input type="text" placeholder="Search for a wine,vineyard or friend" className="searchInput" onChange={event => props.onSearchChange(event.target.value)}/>
                </div>
            </div>
            <div className="topbarRight">
                <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/>
            </div>

        </div>
    )
}
