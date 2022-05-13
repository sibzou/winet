import "./feed.css";
import Post from "../post/Post";
import SearchResult from "../search_result/search_result";
import {useState} from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Feed(props) {
    const searchResultsNodes = [];
    const [currentWineId, setCurrentWineId] = useState();
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
        setCurrentWineId(wineId);
    }

    const sendRate = rate => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/rate");

        const rateReq = {
            token: props.token,
            wineId: currentWineId,
            rate: rate
        }

        xhr.send(JSON.stringify(rateReq));
    }

    const favoriteWine = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/favorite");

        const favoriteReq = {
            token: props.token,
            id: currentWineId
        }

        xhr.send(JSON.stringify(favoriteReq));
    }

    if (props.searchResults) {
        for (let res of props.searchResults) {
            searchResultsNodes.push(<SearchResult wine={res} onClick={() => fetchWine(res.id)}/>);
        }

        return (
            <div className="feed">
                {searchResultsNodes}
            </div>
        )
    } else if (currentWine != null) {
        const rateNodes = [];

        for (let i = 0; i <= 10; i++) {
            rateNodes.push(<p onClick={() => sendRate(i)}>{i}</p>);
        }

        return (
            <div className="detail">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postText">
                            <div>Name : {currentWine.name}</div>
                            <div>Category : {currentWine.category}</div>
                            <div>Vineyard : {currentWine.vineyard}</div>
                            <div>Color : {currentWine.color}</div>
                            <div>Rate : {currentWine.rate}/10</div>
                        </div>
                    </div>
                    <div className="postCenter">
                        <img className="postImg" src="assets/post/1.jpg" alt=""/>
                    </div>
                    <div className="rate-buttons">
                        {rateNodes}
                    </div>
                    <div className="postBottom">
                            <div className="postBottomLeft">
                                <img className="likeIcon" src="assets/heart.png" alt=""/>
                                <span className="postLikeCounter"
                                      onClick={() => favoriteWine()}>Add to favorite</span>
                            </div>
                            <div className="postBottomRight">
                                <span className="postCommentText">5 comments</span>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
