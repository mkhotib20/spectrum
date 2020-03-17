import { Component } from "react";
import { Layout, Tables, Card } from "~/components";
import { Antrian, Project } from '~/fetcher'
import Skeleton from 'react-loading-skeleton'
import nProgress from "nprogress";

class Table extends Component {
    render() {
        return (
            <Layout>
                <div className="container-fluid mb-3">
                    <Tables
                        model={Antrian}
                        actions={['delete', 'update']}
                    />
                </div>
            </Layout>
        )
    }
}
export default Table