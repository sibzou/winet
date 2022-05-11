import "./feed.css";
import Post from "../post/Post";


export default function Feed(){
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>

            </div>
        </div>

    )
}