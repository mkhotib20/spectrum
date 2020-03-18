import { Component } from "react";
import { Layout, Tables, Card, Form } from "~/components"
import { Antrian, Project } from '~/fetcher'
import { FormAttrMaker, withAuth } from "~/helpers";
import Router from "next/router";
import { Loader } from "react-feather";

class Index extends Component {
    state = {
        isLoading: true, 
        data: [],
        dataId: null,
        formAttr: {}
    }
    async componentDidMount(){
        let {id} = this.props.query
        let model = await Antrian.getById(id)
        if (!model) {
            console.log(Antrian.getErrors());
        }
        let attr = await Antrian.getAttributes()
        console.log(FormAttrMaker(attr, Antrian.getData()));
        this.setState({
            dataId: id,
            isLoading: false,
            formAttr: FormAttrMaker(attr, Antrian.getData())
        })
    }
     submitForm = async(e, value) => {
        let id = this.state.dataId
        const insert = await Antrian.update(id, value)
        if (!insert) {
            alert("Gagal")
            return false
        }
        Router.back()
    }
    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    <Card title="Input">
                        {this.state.isLoading ? (<Loader/>) : (
                            <Form 
                                attributes={this.state.formAttr}
                                onSubmit={this.submitForm}
                            />
                        )}
                    </Card>
                </div>
            </Layout>
        )
    }
}
export default withAuth(Index)