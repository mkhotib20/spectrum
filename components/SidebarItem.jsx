import { Component } from "react";
import { Home, Code } from "react-feather";
import Link from './Link'
const SideNavChild = (props) => {
    return(
        <li className={props.active ? 'active' : null}>
            <Link href={props.url}>
                {props.label}
            </Link>
        </li>
    )
}
const SideNavLabel = (props)=>{
    return(
        <div className="">
            {props.children}
        </div>
    )
}
class SidebarItem extends Component
{
    state = {
        isExpanded: false,
    }

    render() {
        if (this.props.child.length>0) {
            return(
                <li className="menu">
                    <span onClick={()=>{
                        this.setState({
                            isExpanded: !this.state.isExpanded
                        })
                    }} data-active={this.state.isExpanded} aria-expanded={this.state.isExpanded} className="dropdown-toggle" data-toggle="collapse">
                        <SideNavLabel>
                            <this.props.icon/>
                            <span>{this.props.label}</span>
                        </SideNavLabel>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                    </span>
                    <ul className={this.state.isExpanded ? 'submenu list-unstyled collapse show' : 'submenu list-unstyled collapse'} id="starter-kit" data-parent="#accordionExample">
                        {this.props.child.map((val, idx) => {
                            return(
                                <SideNavChild active={true} label={val.label} url={val.url} key={idx} />
                            )
                        })}
                    </ul>
                </li>
            )
        }
        return (
            <li className="menu">
                <Link data-active={false} aria-expanded={false} className="dropdown-toggle" href={this.props.url}>
                    <SideNavLabel>
                        <this.props.icon/>
                        <span>{this.props.label}</span>
                    </SideNavLabel>
                </Link>
            </li>
        )
    }
}

export default SidebarItem