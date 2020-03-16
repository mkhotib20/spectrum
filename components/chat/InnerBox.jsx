import React, { useEffect, useState } from 'react'
import { MessageSquare, Check, Clock, CheckCircle } from "react-feather"

export default React.forwardRef((props, ref) => {
    const last_chat = []
    const [isFirst, setIsFirst]  = useState(true)
    useEffect(() => {
        if (last_chat.length>0) {
            let lc = last_chat[props.data.chats.length-1]
            let options = {
                block: 'start'
            }
            if(!props.isFirst){
                options = {
                    behavior: "smooth",
                    block: 'start',
                }
            }
            lc.scrollIntoView(options);            
        }
    })
    return(
        <div className="chat-box-inner" style={{
            height: 'calc(100vh - 233px)'
        }}>
            <div className="chat-meta-user chat-active">
                <div className="current-chat-user-name">
                    <span>
                        <img src={`/chat/${props.data.img}`} alt="avatar"/>
                        <span className="name">
                            {props.data.name}
                        </span>
                    </span>
                </div>

                
            </div>
            <div className="chat-conversation-box ps">
                <div id="chat-conversation-box-scroll" className="chat-conversation-box-scroll">
                    <div className="chat active-chat">
                        {/* <div className="conversation-start">
                            <span>Monday, 1:27 PM</span>
                        </div> */}
                        {props.data.chats.map((val, idx) => {
                            return(
                                <div key={idx} ref={(e)=> last_chat[idx] = e} className={val.incoming ? 'bubble you' : 'bubble me'}>
                                    <span>{val.content}</span>
                                    <span className="chat-indicator float-right">
                                        {val.isSent ? <Check/> : <Clock/>}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="ps__rail-x" style={{
                    left: 0, bottom: 0
                }}>
                    <div className="ps__thumb-x" tabIndex="0" style={{
                        left: 0, width: 0
                    }}></div>
                </div>
                <div className="ps__rail-y" style={{
                    top: 0,right: 0
                }}>
                    <div className="ps__thumb-y" tabIndex="0" style={{
                        top: 0,height: 0
                    }}></div>
                </div>
            </div>
            <div className="chat-footer chat-active">
                <div className="chat-input">
                    <form className="chat-form" onSubmit={(e) => {
                        setIsFirst(false)
                        props.sendChat(e)
                    }}>
                        <MessageSquare/>
                        <input ref={ref} autoFocus={true} autoComplete="off" type="text" name="chatInput"
                        className="mail-write-box form-control" placeholder="Type your Message" />
                    </form>
                </div>
            </div>
        </div>
    )
})