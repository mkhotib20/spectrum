import { Component } from "react";
import { Layout, Tables, Card } from "~/components";
import { Antrian, Project } from '~/fetcher'
import Skeleton from 'react-loading-skeleton'
import nProgress from "nprogress";

class Table extends Component {
    state = {
        isLoading: true, 
        data: [],
        count: 0
    }
    async componentDidMount(){
        // await this.getData(0)
    }
    getData = async(idx, order, size)=>{
        nProgress.start()
        let pageSize = 8
        let limit = pageSize
        let offset = idx*pageSize
        console.log(order);        
        let model = Antrian
        let getData = await model.get({limit: limit, offset: offset, order: order})
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
     changeView = async(e, order)=>{        
        let pageSize = parseInt(e.target.value)
        this.setState({pageSize: pageSize, isLoading: true}, async()=>{
            await this.getData(0, order)
        })
    }
    render() {
        return (
            <Layout>
                <div className="container-fluid mb-3">
                    {/* <Card>
                        {this.state.isLoading ? (
                            <Skeleton count={1} height={100} />
                        ) : (
                            <Tables
                                model={Antrian} 
                                handler={{
                                    delete: (id)=>{
                                        alert(id)
                                    },
                                    update: (id) => {
                                        alert(id)
                                    }
                                }}
                                changeView={this.changeView}
                                count={this.state.count} getData={this.getData} 
                                data={this.state.data} 
                                actions={['delete', 'update']}
                                
                            />
                        )}
                    </Card> */}
                            <Tables
                                model={Antrian} 
                                handler={{
                                    delete: (id)=>{
                                        alert(id)
                                    },
                                    update: (id) => {
                                        alert(id)
                                    }
                                }}
                                actions={['delete', 'update']}
                                
                            />
                </div>
            </Layout>
        )
    }
}
export default Table