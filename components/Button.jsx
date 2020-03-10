export default (props) => {
    return(
        <button className={`btn btn-${props.color || 'info'}`}>
            {props.children}
        </button>
    )
}