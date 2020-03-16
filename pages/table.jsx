import { Component } from "react";
import { Layout, Tables, Card } from "~/components";
import { Antrian, Project } from '~/fetcher'
import Skeleton from 'react-loading-skeleton'

class Table extends Component {
    state = {
        isLoading: true, 
        data: [],
        count: 0,
    }
    async componentDidMount(){
        let model = Antrian
        let getData = await model.get({limit: 5, offset: 0})
        if (!getData) {
            console.log(model.getErrors());
            return false
        }        
        let tmp = model.getData(true).map(val => {
            return {
                nama: val.nama, 
                id: val.id,
                posisi: val.posisi
            }
        })
        this.setState({
            count: model.getCount(),
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
                            <Tables count={this.state.count} data={this.state.data} />
                        )}
                    </Card>
                </div>
            </Layout>
        )
    }
}
export default Table