export default  (props) => {
    return(
        <div {...props} className="person">
            <div className="user-info">
                <div className="f-head">
                    <img src={`/chat/${props.img}`} alt="avatar"/>
                </div>
                <div className="f-body">
                    <div className="meta-info">
                        <span className="user-name" data-name="Nia Hillyer">{props.name}</span>
                        <span className="user-meta-time">2:09 PM</span>
                    </div>
                    <span className="preview">{props.last_chat}</span>
                </div>
            </div>
        </div>  
    )
}