import { Component } from "react";
import { Input, FormFeedback } from "reactstrap";

class InputField extends Component
{
    state = {
        checked: false
    }
    componentDidMount(){
        this.setState({
            checked: this.props.checked
        })
    }
    render() {
        switch (this.props.type) {
            case 'dropdown':
                let selection = this.props.selection  
                return (
                    <div className="form-group">
                        <label>{this.props.label}</label>
                        <select name={this.props.name} className={this.props.className+" form-control"} ref={this.props.innerRef}>
                            <option disabled value={0}>--pilih--</option>
                            {selection.map((val, idx) => {
                                return(
                                    <option value={val.value || val} key={idx}>{val.label || val}</option>
                                )
                            })}
                        </select>       
                        <small><span style={{
                            color: 'red'
                        }}>{this.props.isErrors}</span></small>         
                    </div>
                )
                break;
            case 'boolean':
                return (
                    <div onClick={(e)=>{
                        this.setState({checked: !this.state.checked})
                    }} className="custom-control custom-checkbox mb-3">
                        <input onChange={()=>{}} checked={this.state.checked} ref={this.props.innerRef} name={this.props.name} 
                        type="checkbox" className="custom-control-input" />
                        <label style={{
                            userSelect: 'none'
                        }} className="custom-control-label">{this.props.label}</label>
                    </div>
                )
                break;
        
            default:
                return (
                    <div className="form-group">
                        <label>{this.props.label}</label>
                        <input ref={this.props.innerRef} name={this.props.name || 'form_field'} 
                            placeholder={this.props.placeholder}  
                            type={this.props.type || 'text'} className={this.props.className+" form-control "}
                        />
                        <small><span style={{
                            color: 'red'
                        }}>{this.props.isErrors}</span></small>
                    </div>
                )
                break;
        }
    }
}

export default React.forwardRef((props, ref) => <InputField 
    innerRef={ref} {...props}
/>);