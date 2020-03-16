import { Component } from "react";
import { Edit, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "react-feather";
import {StringHelpers} from '~/helpers'

class Tables extends Component
{
    state = {
        primaryKey: 'id',
        count: []
    }
    componentDidMount(){
        let primaryKey = this.props.primaryKey ? this.props.primaryKey : 'id'
        this.setState({
            primaryKey: primaryKey
        })
        
        let counter = []
        for (let i = 0; i < this.props.count; i++) {
            if (i%5==0) {
                counter.push(i)
            }
        }
        this.setState({
            count: counter
        })
    }
    render() {
        let {data} = this.props
        if (!data.length>0) {
            return (
                <p>Empty Value</p>
            )
        }
        let headers = Object.keys(data[0]).map(key => {
            return key
        })
        
        return (
            <div className="table-responsive">
                <table className="table table-bordered mb-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            {headers.map((val, idx) => {
                                if(val==this.state.primaryKey) return false
                                if(this.props.headerAs){
                                    if(this.props.headerAs.hasOwnProperty(val)){
                                        return(
                                            <th key={idx}>{this.props.headerAs[val]}</th>
                                        )
                                    }
                                }
                                return(
                                    <th key={idx}>{StringHelpers.snakeToCamel(val).toUpperCase()}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((val, idx) => {
                            return(
                                <tr key={idx}>
                                    <td>{idx+1}</td>
                                    {headers.map((val2, idx2) => {
                                        if(val2==this.state.primaryKey) return false
                                        if(this.props.template){
                                            if(this.props.template.hasOwnProperty(val2)){
                                                let Template = this.props.template[val2]
                                                return(
                                                    <td key={idx2}>
                                                        <Template value={val[val2]} />
                                                    </td>
                                                )
                                            }
                                        }
                                        return(
                                            <td key={idx2}>{val[val2]}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="paginating-container pagination-solid">
                    <ul className="pagination">
                        <li className="prev"><button><ChevronLeft/></button></li>
                            {this.state.count.map((val, idx) => {
                                return(
                                    <li key={idx}><button>{idx+1}</button></li>
                                )
                            })}
                        <li className="next"><button><ChevronRight/></button></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Tables