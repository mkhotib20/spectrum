import { Component } from "react";
import { Edit, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, Circle, Edit3, Edit2, Trash2 } from "react-feather";
import {StringHelpers} from '~/helpers'
const Icons = ({type, handler}) => {
    let RenderIcon
    switch (type) {
        case 'delete':
            RenderIcon = Trash2
            break;
        case 'update':
            RenderIcon = Edit
            break;
    
        default:
            return Circle
            break;
    }
    return(
        <span onClick={handler} title={StringHelpers.snakeToCamel(type)} className="form-actions">
            <RenderIcon/>
        </span>
    )
}

class Tables extends Component
{
    state = {
        primaryKey: 'id',
        count: [],
        selected: 0
    }
    componentDidMount(){
        let primaryKey = this.props.primaryKey ? this.props.primaryKey : 'id'
        this.setState({
            primaryKey: primaryKey
        })
        
        let counter = []
        for (let i = 0; i < this.props.count; i++) {
            if (i%this.props.pageSize==0) {
                counter.push(i)
            }
        }
        this.setState({
            count: counter
        })
    }
    changePage = (nowPage) => {
        this.setState({
            selected: nowPage
        }, ()=>{
            this.props.changePage(nowPage, this.props.pageSize)
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
            <div>
            <div style={{
                height: this.props.pageSize*58
            }} className="table-responsive">
                <table className="table table-hover table-bordered mb-4">
                    <thead>
                        <tr>
                            <th style={{
                                width: 30
                            }}>#</th>
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
                            {this.props.actions ? (
                                <th>Action</th>
                            ): false}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((val, idx) => {
                            return(
                                <tr key={idx}>
                                    <td style={{
                                        width: 50, textAlign: 'center'
                                    }}>{(idx+1)+(this.props.pageSize*this.state.selected)}</td>
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
                                    {this.props.actions ? (
                                        <td style={{
                                            width: 80*this.props.actions.length
                                        }} >
                                            {this.props.actions.map((val2, idx) => {
                                                if(this.props.actionTemplate){
                                                    if(this.props.actionTemplate[val2]){
                                                        let Tmp = this.props.actionTemplate[val2]
                                                        return <span onClick={()=>{
                                                                this.props.handler[val2](val.id)
                                                            }} className="form-actions">
                                                            <Tmp key={val.id} />
                                                        </span>
                                                    }
                                                }
                                                return(
                                                    <Icons handler={()=>{
                                                        this.props.handler[val2](val.id)
                                                    }} key={idx} type={val2}/>
                                                )
                                            })}
                                        </td>
                                    ): false}

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <small className="page-indicators">Showing {
                        (this.state.selected+1)*(this.props.pageSize) > 
                        this.props.count ? this.props.count : 
                        (this.state.selected+1)*(this.props.pageSize)
                    } of {this.props.count} data </small>
                </div>
                <div className="col-md-9">
                    <div className="paginating-container pagination-solid float-right">
                        <ul className="pagination">
                            <li onClick={()=>{
                                let {selected} = this.state
                                if(selected==0){
                                    return false
                                }
                                selected--
                                this.changePage(selected)
                            }} className={this.state.selected==0 ? 'prev disabled' : 'prev'}><span ><ChevronLeft/></span></li>
                                {this.state.count.map((val, idx) => {
                                    let page = idx+1
                                    let isActive = idx==this.state.selected ? 'active' : null
                                    return(
                                        <li onClick={()=>{
                                            this.changePage(idx)
                                        }} className={isActive} key={idx}><span>{page}</span></li>
                                    )
                                })}
                            <li onClick={()=>{
                                let {selected, count} = this.state
                                selected++
                                if(selected==count.length){
                                    return false
                                }
                                this.changePage(selected)
                            }} className={this.state.selected==this.state.count.length-1 ? 'next disabled' : 'next'}><span><ChevronRight/></span></li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Tables