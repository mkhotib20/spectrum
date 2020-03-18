import { Component } from "react";
import { Layout, Tables, Card, Button, Link } from "~/components";
import { Antrian, Project } from '~/fetcher'
import Skeleton from 'react-loading-skeleton'
import nProgress from "nprogress";
import { Plus } from "react-feather";
import Router, {withRouter} from "next/router";
import { withAuth } from "~/helpers";
class Table extends Component {
    delete = async (id)=>{
        return new Promise(async(res, rej) => {
            const softDelete = await Antrian.softDelete(id)
            if (!softDelete) {
                alert("Gagal")
                rej(Antrian.getErrors())
                return false
            }
            res(Antrian.getData())
        })
    }
    render() {
        return (
            <Layout>
                <div className="container-fluid mb-3">
                    <Card title="List Data">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <Link className="btn btn-info float-right" href={`${this.props.router.pathname}/new`}>
                                    <Plus/> Tambah Data
                                </Link>
                            </div>
                            <div className="col-md-12">
                                <Tables
                                    handler={{
                                        update: (id)=>{
                                            let {pathname} = Router
                                            Router.push(`${pathname}/[id]/update`, `${pathname}/${id}/update`)
                                        },
                                        delete: this.delete
                                    }}
                                    model={Antrian}
                                    actions={['delete', 'update']}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </Layout>
        )
    }
}
export default withAuth(Table)