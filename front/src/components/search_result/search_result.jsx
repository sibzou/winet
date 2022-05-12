import "./search_result.css";

export default (props) => {
    const wine = props.wine;

    return (
        <div className="search-result">
            <p className="name">{wine.name}</p>
            <p className="category">{wine.category}</p>
        </div>
    )
}
