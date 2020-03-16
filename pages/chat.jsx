import { Component } from "react";
import { 
    Layout, Chat
 } from "~/components";
 import Cookies from 'js-cookie'
 import { Members, Persons } from '~/fetcher'
 import nextCookies from 'next-cookies'
import Skeleton from "react-loading-skeleton";
import nProgress from "nprogress";
import {Socket} from '~/helpers'
import Router from 'next/router'

const redirect = (ctx) => {
    if (typeof window === 'undefined') {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
    } else {
        Router.push('/login')
    }
}

class ChantPage extends Component 
{    
    chatInput = React.createRef()
    state={
        personSelected: null,
        isLoading: true,
        persons: [],
        room: null
    }

    async componentDidMount(){
        this.setState({
            persons: this.props.persons,
            isLoading: false
        })
        Socket.on('chat_message', data => {            
            let {personSelected, persons} = this.state
            let {user_id_sender} = data
            if(personSelected!=null){
                if (user_id_sender==personSelected.id) {
                    personSelected.chats.push({
                        content: data.message,
                        incoming: true
                    })
                    // console.log(personSelected);
                }
                else{
                    personSelected.chats[personSelected.chats.length-1].isSent = true
                }
                
                this.setState({personSelected: personSelected})
            }
            else{
                console.log(persons);
            }
            
        })
    }
    static getInitialProps(ctx){
        let {user_data} = nextCookies(ctx)
        if (!user_data) {
            redirect(ctx)
            return false
        }
        let {id} = user_data
        let prs = Persons.filter(val => {
            return val.id!=id
        })
        return {
            persons: prs,
            user_data: user_data
        }
    }
    sendChat = (e)=>{
        e.preventDefault() 
        let {user_data} = this.props
        let formData = new FormData(e.target)
        let chatInput = formData.get("chatInput")
        if(chatInput=='') return false
        let {chats, persons, personSelected} = this.state
        Socket.emit('chat_message', {
            user_id_sender: user_data.id,
            user_id_receiver: this.state.personSelected.id,
            message: chatInput,
            room: this.state.room
        })
        personSelected.chats.push({
            content: chatInput,
            incoming: false,
            isSent: false
        })
        this.setState({
            personSelected: personSelected
        }, () => {
            this.chatInput.current.value = ""
        })
    }
    joinRoom = (_room) => {
        return new Promise((res, rej) => {
            try {
                Socket.emit('join', _room)
                Socket.on('initial_chat', data => {
                    res(data)
                })
            } catch (error) {
                rej(error)
            }
        })
    }
    selectPerson = async(idx, id)=>{
        nProgress.start()
        let {user_data} = this.props
        let {persons} = this.state
        let _room = `${user_data.id}||||${id}`
        try {
            let chatData = await this.joinRoom(_room)
            persons[idx].chats = chatData.map(val => {
                return {
                    content: val.message,
                    incoming: user_data.id!=val.user_id_sender,
                    isSent: true
                }
            })
            this.setState({
                persons: persons,
                room: _room,
                personSelected: persons[idx], 
            }, () => {
                setTimeout(()=>{
                    this.chatInput.current.focus()
                    nProgress.done()
                }, 200)
            })
        } catch (error) {
            console.log(error);
            
        }
    }
    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    {this.state.isLoading ? (
                        <Skeleton/>
                    ) : (
                        <Chat 
                            ref={this.chatInput} 
                            personSelected={this.state.personSelected}
                            selectPerson={this.selectPerson}
                            sendChat={this.sendChat}
                            persons ={this.state.persons} 
                        />
                    )}
                </div>
            </Layout>
        )
    }
}
export default ChantPage