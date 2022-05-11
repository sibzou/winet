import "./feed.css";
import Post from "../post/Post";
import SearchResult from "../search_result/search_result";

export default function Feed(props){
    const searchResultsNodes = [];

    if(props.searchResults) {
        for(let res of props.searchResults) {
            searchResultsNodes.push(<SearchResult wine={res}/>);
        }
    }

    return (
        <div className="feed">
            <div className="feedWrapper">
                {searchResultsNodes}
            </div>
        </div>

    )
}
