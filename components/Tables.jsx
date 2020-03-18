import { Component } from "react";
import { Edit, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, Circle, Edit3, Edit2, Trash2 } from "react-feather";
import {StringHelpers, DropdownMaker} from '~/helpers'
import nProgress from "nprogress";
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
        pageSize: 8,
        selectedFilter: {
            orderBy: 'updatedAt',
            type:'DESC'
        },
        rowHeight: 49,
        primaryKey: 'id',
        pages: [],
        selected: 0,
        filterType: [],
        headers: [],
        data: []
    }
    changeOrder = (e, label) => {
        let {selectedFilter} = this.state
        
        selectedFilter[label] = e.target.value
        
        this.setState({
            selectedFilter: selectedFilter
        }, async()=>{
            try {
                const {data} = await this.getData()
                this.setState({
                    data: data
                })
            } catch (error) {
                
            }
        })
    }
    
    getData = async()=>{
        return new Promise(async(res, rej) => {
            nProgress.start()
            let idx = this.state.selected
            let pageSize = this.state.pageSize
            let limit = pageSize
            let offset = idx*pageSize
            let model = this.props.model
            let order = Object.keys(this.state.selectedFilter).length>0 ? this.state.selectedFilter : null
            

            let getData = await model.get({limit: limit, offset: offset, order: order})
            if (!getData) {
                console.log(model.getErrors());
                nProgress.done()
                rej(false)
                return false
            }        
            let tmp = model.getData(true).map(val => {
                return {
                    nama: val.nama, 
                    id: val.id,
                    posisi: val.posisi
                }
            })
            res({
                count: model.getCount(),
                data: tmp,
            })
            nProgress.done()
        })
    }
    async componentDidMount(){
        let primaryKey = this.props.primaryKey ? this.props.primaryKey : 'id'
        try {
            let {data,count} = await this.getData()
            
            let headers = Object.keys(data[0]).map(key => {
                return key
            })
            let selectedFilter = headers.filter(val => {
                return val!=primaryKey
            }).find((val,idx) => {
                return idx==0
            })
            selectedFilter = Object.keys(this.state.selectedFilter).length>0 ? this.state.selectedFilter : {
                orderBy: selectedFilter,
                type: 'ASC'
            }
            this.setState({
                data: data,
                pages: this.createPages(count),
                dataCount: count,
                headers: headers,
                filterType: ['ASC', 'DESC'],
                primaryKey: primaryKey,
                selectedFilter: selectedFilter
            })
        } catch (error) {
            console.log(error);
        }
    }
    createPages = (count)=>{
        let counter = []
        for (let i = 0; i < count; i++) {
            if (i%this.state.pageSize==0) {
                counter.push(i)
            }
        }
        return counter
    }
    updateData = async (idx) => {
        this.setState({
            selected: idx
        }, async()=>{
            try {
                let {data, count} = await this.getData()
                this.setState({
                    data: data
                })
            } catch (error) {
                console.log(error);   
            }
        })
    }
    changePageSize = (e) => {
        this.setState({
            selected: 0,
            pageSize: parseInt(e.target.value)
        }, async()=>{
            try {
                let {data, count} = await this.getData()
                this.setState({data: data, pages: this.createPages(count)})
            } catch (error) {
                console.log(error);
                
            }
        })
    }
    handler = async(id, type)=>{
        switch (type) {
            case 'delete':
                alert('hapus '+ id)
                break;
        
            case 'update':
                alert('edit '+ id)
                break;
            default:
                break;
        }
    }
    render() {
        
        return (
            <div style={{
                height: (this.state.pageSize*this.state.rowHeight)+(this.state.rowHeight*3)
            }} className="table-container">
                <div className="row mb-3">
                    <div className="col-md-3">
                        <small>Page size </small>
                        <select onChange={this.changePageSize} value={this.state.pageSize}>
                            <option value="5">5</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    {this.props.filter==false ? false : (
                        <div className="col-md-5">
                            <small>Urutkan </small>
                            <select onChange={(e)=>{this.changeOrder(e, 'orderBy')}} value={this.state.selectedFilter.orderBy}>
                                    <option value={'createdAt'}>{'createdAt'}</option>
                                
                                {this.state.headers.map((val, idx) => {
                                    if(val==this.state.primaryKey) return false
                                    return(
                                        <option key={idx} value={val}>{val}</option>
                                    )
                                })}

                            </select>
                            <small>  </small>
                            <select onChange={(e)=>{this.changeOrder(e, 'type')}} value={this.state.selectedFilter.type}>
                                {this.state.filterType.map((val, idx) => {
                                    return(
                                        <option key={idx} value={val}>{val}</option>
                                    )
                                })}

                            </select>
                        </div>
                    
                    )}
                    <div className="col-md-3">
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-bordered mb-4">
                        <thead>
                            <tr>
                                <th style={{
                                    width: 30
                                }}>#</th>
                                {this.state.headers.map((val, idx) => {
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
                            {this.state.data.map((val, idx) => {
                                return(
                                    <tr key={idx}>
                                        <td style={{
                                            width: 50, textAlign: 'center'
                                        }}>{(idx+1)+(this.state.pageSize*this.state.selected)}</td>
                                        {this.state.headers.map((val2, idx2) => {
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
                                                            return <span onClick={async()=>{
                                                                    if(this.props.handler){
                                                                        if(this.props.handler[val2]){
                                                                            await this.props.handler(val[this.state.primaryKey])
                                                                            this.getData()
                                                                            return false
                                                                        }
                                                                    }
                                                                    this.handler(val[this.state.primaryKey], val2)
                                                                }} className="form-actions">
                                                                <Tmp key={val.id} />
                                                            </span>
                                                        }
                                                    }
                                                    return(
                                                        <Icons handler={async()=>{
                                                            if(this.props.handler){
                                                                if(this.props.handler[val2]){
                                                                    await this.props.handler[val2](val[this.state.primaryKey])
                                                                    this.getData()
                                                                    return false
                                                                }
                                                            }
                                                            this.handler(val[this.state.primaryKey], val2)
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
                <div className="table-pagination">
                    <div className="row">
                        <div className="col-md-3">
                            <small className="page-indicators">Showing {
                                (this.state.selected+1)*(this.state.pageSize) > 
                                this.state.dataCount ? this.state.dataCount : 
                                (this.state.selected+1)*(this.state.pageSize)
                            } of {this.state.dataCount} data </small>
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
                                        this.updateData(selected)
                                    }} className={this.state.selected==0 ? 'prev disabled' : 'prev'}><span ><ChevronLeft/></span></li>
                                        {this.state.pages.map((val, idx) => {
                                            let page = idx+1
                                            let isActive = idx==this.state.selected ? 'active' : null
                                            return(
                                                <li onClick={()=>{
                                                    this.updateData(idx)
                                                }} className={isActive} key={idx}><span>{page}</span></li>
                                            )
                                        })}
                                    <li onClick={()=>{
                                        let {selected, pages} = this.state
                                        selected++
                                        if(selected==pages.length){
                                            return false
                                        }
                                        this.updateData(selected)
                                    }} className={this.state.selected==this.state.pages.length-1 ? 'next disabled' : 'next'}><span><ChevronRight/></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tables