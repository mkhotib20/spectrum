import { Component } from "react";
import { 
    Layout, Chat
 } from "~/components";
 import { Members } from '~/fetcher'

class ChantPage extends Component {
    
    async componentDidMount(){
        let msg = await Members.get()
        if (!msg) {
            console.log(Members.getErrors());
            return false
        }
        
        
    }
    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    <Chat/>
                </div>
            </Layout>
        )
    }
}
export default ChantPage