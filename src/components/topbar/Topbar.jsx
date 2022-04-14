import React from 'react';
import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';

export default function Topbar(){
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">Winet</span>
            </div>

            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="topbarRight"></div>

        </div>
    )
}