import { Component } from "react";
import { Layout, Tables, Card } from "~/components";
import { Antrian, Project } from '~/fetcher'
import Skeleton from 'react-loading-skeleton'

class Table extends Component {
    state = {
        isLoading: true, 
        data: []
    }
    async componentDidMount(){
        let model = Antrian
        let getData = await model.get()
        if (!getData) {
            console.log(model.getErrors());
            return false
        }
        let tmp = model.getData().map(val => {
            return {
                nama: val.nama, 
                id: val.id,
                posisi: val.posisi
            }
        })
        this.setState({
            data: tmp,
            isLoading: false, 
        })
    }
    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    <Card>
                        {this.state.isLoading ? (
                            <Skeleton count={10} />
                        ) : (
                            <Tables data={this.state.data} />
                        )}
                    </Card>
                </div>
            </Layout>
        )
    }
}
export default Table