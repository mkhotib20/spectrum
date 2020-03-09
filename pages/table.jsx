import { Component } from "react";
import { Layout, Tables, Card } from "~/components";
import socketIOClient from "socket.io-client";

// const endpoint = "http://localhost:1000/"
// const socket = socketIOClient(process.env.BACKEND_URL, {
//     transports: ['websocket']
// });

class Index extends Component {
    componentDidMount(){
        // socket.emit("join", 20)
    }
    state = {
        data: [
            {
                nama_lengkap: "Muhammad khotib",
                usia: 12
            },
            {
                nama_lengkap: "Medhita Eka Cahya",
                usia: 12
            },
        ]
    }
    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    <Card>
                        <Tables
                            
                            headerAs={{
                                nama_lengkap: 'Nama Kamu'
                            }}
                            template={{
                                usia: (props) => {
                                    return(
                                        <span style={{color: "red"}}>{props.value}</span>
                                    )
                                }
                            }}
                            data={this.state.data} 
                        />
                    </Card>
                </div>
            </Layout>
        )
    }
}
export default Index