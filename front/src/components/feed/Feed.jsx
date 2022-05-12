import "./feed.css";
import Post from "../post/Post";
import SearchResult from "../search_result/search_result";
import {useState} from "react";

export default function Feed(props){
    const searchResultsNodes = [];
    const [currentWine, setCurrentWine] = useState(null);

    const onWineDetails = event => {
        const wine = JSON.parse(event.target.responseText);
        setCurrentWine(wine);
        props.removeSearchResultsCallback();
    }

    const fetchWine = wineId => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/wine");
        xhr.onload = onWineDetails;

        const details = {
            token: props.token,
            id: wineId
        };

        xhr.send(JSON.stringify(details));
    }

    if(props.searchResults) {
        for(let res of props.searchResults) {
            searchResultsNodes.push(<SearchResult wine={res} onClick={() => fetchWine(res.id)}/>);
        }

        return (
            <div className="feed">
                {searchResultsNodes}
            </div>
        )
    } else if(currentWine != null) {
        return (
            <div>
                <p>{currentWine.name}</p>
                <p>{currentWine.category}</p>
                <p>{currentWine.vineyard}</p>
                <p>{currentWine.color}</p>
            </div>
        )
    }
}
