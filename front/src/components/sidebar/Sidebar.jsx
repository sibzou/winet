import "./sidebar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import WineBarIcon from '@mui/icons-material/WineBar';
import ClassIcon from '@mui/icons-material/Class';

export default function Sidebar(){
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeedIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Feed
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <FavoriteIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Favorites
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <AddBusinessIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Add Business
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <WineBarIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Add Wine
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <ClassIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">
                            Add Wine Category
                        </span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    <li className="sidebarFriend">
                        <img src="/assets/person/2.jpeg" alt="" className="sidebarFriendImg"/>
                        <span className="sidebarFriendName">Kevin Boudina</span>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/3.jpeg" alt="" className="sidebarFriendImg"/>
                        <span className="sidebarFriendName">Kevin Boudina</span>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/10.jpeg" alt="" className="sidebarFriendImg"/>
                        <span className="sidebarFriendName">Kevin Boudina</span>
                    </li>
                </ul>
            </div>
        </div>

    )
}