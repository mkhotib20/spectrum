import { Component } from "react";
// import '@static/template/assets/js/apps/mailbox-chat.js'
import '@static/template/assets/css/apps/mailing-chat.css'
import { Search, Menu, MessageCircle, MessageSquare } from "react-feather";
import '@static/template/plugins/perfect-scrollbar/perfect-scrollbar.min.js'
import InnerBox from '@component/chat/InnerBox'
import Person from '@component/chat/Person'
import nProgress from "nprogress";

class Wrapper extends Component
{
    lastChat = []
    state={
        isFirst: true, 
        persons: []
    }
    render() {
        return (
            <div className="chat-system">
                <div className="hamburger">
                    <Menu/>
                </div>
                <div className="user-list-box">
                    <div className="search">
                        <Search/>
                        <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    <div className="people">
                        {this.props.persons.map((val, idx) => {
                            let lastChat = val.chats.length>0 ? val.chats[val.chats.length-1] : {content: '-'}
                            return(
                                <Person key={idx} img={val.img} name={val.name} onClick={()=>{
                                    this.setState({isFirst: true})
                                    this.props.selectPerson(idx, val.id)
                                }} last_chat={lastChat.content}/>
                            )
                        })}
                    </div>
                </div>
                <div className="chat-box">
                    {this.props.personSelected == null ? (
                        <div className="chat-not-selected">
                            <p> <MessageCircle/> Click User To Chat</p>
                        </div>
                    ) : (
                        <InnerBox isFirst={this.state.isFirst} last_chat={this.lastChat} sendChat={(e)=>{
                            this.setState({isFirst: false})
                            this.props.sendChat(e)
                        }} 
                        data={this.props.personSelected} ref={this.props.innerRef}/>
                    )}                    
                </div>
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <Wrapper 
    innerRef={ref} {...props}
/>);