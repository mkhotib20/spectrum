import { Component } from "react";
import { Layout } from "~/components";
import socketIOClient from "socket.io-client";

// const endpoint = "http://localhost:1000/"
// const socket = socketIOClient(process.env.BACKEND_URL, {
//     transports: ['websocket']
// });

class Index extends Component {
    componentDidMount(){
        // socket.emit("join", 20)
    }
    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    <p>Hello World</p>
                </div>
            </Layout>
        )
    }
}
export default Index