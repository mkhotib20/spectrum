import Head from 'next/head'
import { Component } from 'react'
import Users from '../models/Users'
import socketIOClient from "socket.io-client";
const socket = socketIOClient(process.env.BACKEND_URL, {
    transports: ['websocket'],
});


class Index extends Component
{  
  state = {
    chats: [],
    msg: '',
    room: "121dw21"
  }
  
  async componentDidMount(){
    socket.emit("join", this.state.room)
    socket.on("initial_chat", (msg:any) => {
      console.log(msg);
      this.setState({chats: msg})
    })
    socket.on("chat_message", data => {
      let {chats} = this.state
      chats.push(data)
      this.setState({
        chats: chats
      })
    })
  }
  sendChat = (e)=>{
    e.preventDefault()
    let data = {
        room: this.state.room,
        user_id_sender: 'as',
        user_id_receiver: '18292198',
        message: this.state.msg
    }
    this.setState({
      msg: ''
    })
    socket.emit("chat_message", data)
  }
  render(){
    return(
      <div>
        <ul>
          {this.state.chats.map((val, idx) => {
            return(
              <li key={idx}>{val.message}</li>
            )
          })}
        </ul>
       <form onSubmit={this.sendChat}>
        <input autoFocus type="text" value={this.state.msg} onChange={(e) => {
            this.setState({msg: e.target.value})
          }}/>
          <button>Send</button>
       </form>
      </div>
    )
  }
}

export default Index
