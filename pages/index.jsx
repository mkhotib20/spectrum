import { Component } from "react";
import { Layout, Tables, Card } from "~/components";
import socketIOClient from "socket.io-client";

// const endpoint = "http://localhost:1000/"
// const socket = socketIOClient(process.env.BACKEND_URL, {
//     transports: ['websocket']
// });

class Index extends Component {
    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    <Card>
                    </Card>
                </div>
            </Layout>
        )
    }
}
export default Index