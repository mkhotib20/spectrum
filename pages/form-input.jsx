import { Component } from "react";
import { Layout, Tables, Card, Form } from "~/components"

class Index extends Component {
    state = {
        isLoading: true, 
        data: [],
        formAttr: {
            nama_lengkap: '',
            alamat: '',
            pekerjaan_sekarang: "",
            usia: "",
            status_pernikahan: '',
        }
    }
    async componentDidMount(){

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
                            onSubmit={(e, value) => {
                                
                            }}
                        />
                    </Card>
                </div>
            </Layout>
        )
    }
}
export default Index