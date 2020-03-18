import { Component } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { StringHelpers } from "~/helpers";
import nProgress from "nprogress";

class FormInput extends Component
{
    state={
        errors:{}
    }
    validateInput = (data) => {
        return new Promise((res, rej) => {
            try {
                let errors = {}
                Object.keys(this.props.attributes).map(key => {
                    if (this.props.types) {
                        if (this.props.types[key]=='boolean') return false 
                        if (this.props.types[key]=='dropdown') {
                            data[key] = !data[key] ? '' : data[key]
                        }
                    }
                    if (data[key] == '') {
                        errors[key] = 'please fill this field'
                        this.refs[key].classList.toggle("is-valid", false)
                        this.refs[key].classList.toggle("is-invalid", true)
                    }
                    else{
                        this.refs[key].classList.toggle("is-invalid", false)
                        this.refs[key].classList.toggle("is-valid", true)
                    }
                })
                this.setState({errors: errors})
                res(true)
            } catch (error) {
                rej(error)
            }
        })
    }
    submit = async(e)=>{
        e.preventDefault()
        nProgress.start()
        let formData = new FormData(e.target)
        let data = formData
        
        if (!this.props.multipart) {
            data = this.serializer(formData)
        }
        await this.validateInput(data)
        if (Object.keys(this.state.errors).length>0) {
            nProgress.done()
            return false
        }
        this.props.onSubmit(e, data)
        nProgress.done()
    }
    serializer = (fd) => {
        const data = {};
          for (let key of fd.keys()) {
            data[key] = fd.get(key);
        }
        return data;
    }
    componentDidMount(){
        let {attributes} = this.props
        Object.keys(attributes).map(key => {
            if (this.props.types) {
                if (this.props.types[key]=='dropdown') {
                    attributes[key] = attributes[key]== '' ? 0 : attributes[key] 
                }
            }
            this.refs[key].value = attributes[key]
        })
    }
    resetValue(){
        let {attributes} = this.props
        Object.keys(attributes).map(key => {
            this.refs[key].value = ''
        })
    }
    render() {
        let inputs = Object.keys(this.props.attributes)
        return (
            <form className="simple-example" onSubmit={this.submit} noValidate>
                <div className="form-row">
                    <div className="col-md-12 mb-4">
                        {inputs.map((key, idx) => {
                            let selection = []
                            if(this.props.hasOwnProperty(key)){
                                selection = this.props[key]
                            }
                            if(this.props.types){
                                return(
                                    <InputField isErrors={this.state.errors[key]} key={idx} selection={selection} ref={key} 
                                    checked={this.props.types[key]=="boolean" ? this.props.attributes[key] : false}
                                    type={this.props.types[key]} 
                                    name={key} 
                                    label={StringHelpers.snakeToCamel(key)} />
                                )
                            }
                            
                            return(
                                <InputField isErrors={this.state.errors[key]} key={idx} ref={key}
                                name={key} 
                                label={StringHelpers.snakeToCamel(key)} />
                            )
                        })}
                    </div>
                </div>
                <Button color="danger">Klik</Button>
            </form>
        )
    }
}

export default FormInput