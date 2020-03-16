import { Component } from "react";
import { Layout, Tables, Card, Form } from "~/components"
import { Antrian, Project } from '~/fetcher'
import { FormAttrMaker } from "~/helpers";

class Index extends Component {
    state = {
        isLoading: true, 
        data: [],
        formAttr: {}
    }
    async componentDidMount(){
        let attr = await Antrian.getAttributes()
        console.log(FormAttrMaker(attr));
        
        this.setState({
            formAttr: FormAttrMaker(attr)
        })
    }
    async submitForm(e, value){
        const insert = await Antrian.insert(value)
        if (!insert) {
            alert("Gagal")
            return false
        }
    }
    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    <Card title="Input">
                        <Form 
                            attributes={this.state.formAttr}
                            usia={[
                                {value: 1, label: "ana"},
                                {value: 2, label: "Ani"}
                            ]}
                            types={{

                                usia: 'dropdown',
                                status_pernikahan: "boolean"
                            }}
                            onSubmit={this.submitForm}
                        />
                    </Card>
                </div>
            </Layout>
        )
    }
}
export default Index