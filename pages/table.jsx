import { Component } from "react";
import { Layout, Tables, Card } from "~/components";
import { Antrian, Project } from '~/fetcher'
import Skeleton from 'react-loading-skeleton'
import nProgress from "nprogress";

class Table extends Component {
    state = {
        isLoading: true, 
        data: [],
        count: 0,
        pageSize: 8
    }
    async componentDidMount(){
        await this.getData(0, this.state.pageSize)
    }
    getData = async(idx, size)=>{
        nProgress.start()
        let pageSize = size
        let limit = pageSize
        let offset = idx*pageSize

        let model = Antrian
        let getData = await model.get({limit: limit, offset: offset})
        if (!getData) {
            console.log(model.getErrors());
            nProgress.done()
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
        }, ()=>{
            nProgress.done()
        })
    }
     changeView = async(e)=>{        
        let pageSize = parseInt(e.target.value)
        this.setState({pageSize: pageSize, isLoading: true}, async()=>{
            await this.getData(0, pageSize)
        })
        
    }
    render() {
        return (
            <Layout>
                <div className="container-fluid mb-3">
                    <Card>
                        {this.state.isLoading ? (
                            <Skeleton count={1} height={100} />
                        ) : (
                            <Tables 
                                handler={{
                                    delete: (id)=>{
                                        alert(id)
                                    },
                                    update: (id) => {
                                        alert(id)
                                    }
                                }}
                                changeView={this.changeView}
                                pageSize={this.state.pageSize} 
                                count={this.state.count} getData={this.getData} 
                                data={this.state.data} 
                                actions={['delete', 'update']}
                                
                            />
                        )}
                    </Card>
                </div>
            </Layout>
        )
    }
}
export default Table