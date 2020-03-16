import { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import { MoreVertical, MoreHorizontal, PlusCircle } from "react-feather";

class Lanes extends Component
{
    state={
        dropdownOpen: false
    }
    render() {
        return (
            <div data-section="s-new" className="task-list-container">
                <div className="connect-sorting">
                    <div className="task-container-header">
                        <h6 className="s-heading">In Progress</h6>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={()=>{
                            this.setState({dropdownOpen: !this.state.dropdownOpen})
                        }}>
                            <DropdownToggle nav>
                                <MoreHorizontal/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className="list-edit">Edit</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default Lanes