import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {useState} from "react";
import "./Home.css";

export default function Home(props) {
    const [stopTypeTimer, setStopTypeTimer] = useState();
    const [searchResults, setSearchResults] = useState(null);

    const onStopType = async text => {
        const xhr = new XMLHttpRequest();

        const response = await fetch("http://localhost:8080/search", {
            method: "POST",
            body: JSON.stringify({
                token: props.token,
                query: text
            })
        });

        const results = await response.json();
        setSearchResults(results);
        console.log(results);
    }

    const onSearchChange = text => {
        if(text == "") {
            setSearchResults(null);
        } else {
            clearTimeout(stopTypeTimer);
            const timer = setTimeout(onStopType, 500, text);
            setStopTypeTimer(timer);
        }
    }

    return (
        <>
            <Topbar onSearchChange={onSearchChange}/>
            <div className="homeContainer">
                <Sidebar/>
                <Feed searchResults={searchResults}/>
                <Rightbar/>
            </div>
        </>
    );
}
