export default (props) => {
    const wine = props.wine;

    return (
        <div>
            <p>{wine.name}</p>
            <p>{wine.category}</p>
        </div>
    )
}
