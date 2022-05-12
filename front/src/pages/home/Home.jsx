import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {useState} from "react";
import "./Home.css";

export default function Home(props) {
    const [stopTypeTimer, setStopTypeTimer] = useState();
    const [searchResults, setSearchResults] = useState(null);
    const [searchXhr, setSearchXhr] = useState();

    const onSearchChange = text => {
        clearTimeout(stopTypeTimer);
        if(searchXhr) searchXhr.abort();

        if(text == "") {
            setSearchResults(null);
        } else {
            const timer = setTimeout(onStopType, 500, text);
            setStopTypeTimer(timer);
        }
    }

    const onStopType = text => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/search");
        xhr.onload = onSearchDone;

        const searchQuery = {
            token: props.token,
            query: text
        };

        xhr.send(JSON.stringify(searchQuery));
        setSearchXhr(xhr);
    }

    const onSearchDone = event => {
        const xhr = event.target;
        const results = JSON.parse(xhr.responseText);
        setSearchResults(results);
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
