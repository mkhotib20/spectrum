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
    chatInput = React.createRef()
    state={
        chatSelected: null,
        persons: [
            {
                name: "Mbak Cantik",
                img: "mbak-cantik.jpg",
                chats: [
                    {content: "Hello", incoming: false},
                    {content: "Hai juga", incoming: false},
                ]
            },
            {
                name: "Siscaee",
                img: "mbak-cantik.jpg",
                chats: [
                    {content: "Halo bang ojol", incoming: true},
                    {content: "Hai juga", incoming: false},
                    {content: "Halo bang ojol", incoming: true}
                ]
            }
        ]
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
                        {this.state.persons.map((val, idx) => {
                            let lastChat = val.chats[val.chats.length-1]
                            return(
                                <Person key={idx} img={val.img} name={val.name} onClick={()=>{
                                    nProgress.start()
                                    this.setState({
                                        chatSelected: idx
                                    }, () => {
                                        setTimeout(()=>{
                                            this.chatInput.current.focus()
                                            nProgress.done()
                                        }, 200)
                                    })
                                }} last_chat={lastChat.content}/>
                            )
                        })}
                    </div>
                </div>
                <div className="chat-box">
                    {this.state.chatSelected == null ? (
                        <div className="chat-not-selected">
                            <p> <MessageCircle/> Click User To Chat</p>
                        </div>
                    ) : (
                        <InnerBox last_chat={this.lastChat} sendChat={(e)=>{
                            e.preventDefault() 
                            let formData = new FormData(e.target)
                            let chatInput = formData.get("chatInput")
                            if(chatInput=='') return false
                            let {chats, persons, chatSelected} = this.state
                            persons[chatSelected].chats.push({
                                content: chatInput,
                                incoming: false
                            })
                            this.setState({
                                persons: persons
                            }, () => {
                                this.chatInput.current.value = ""
                            })
                        }} data={this.state.persons[this.state.chatSelected]} ref={this.chatInput}/>
                    )}                    
                </div>
            </div>
        )
    }
}

export default Wrapper