import { Component } from "react";
import Link from './Link'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { User, LogOut } from "react-feather";

class Navbar extends Component
{
    state = {
        dropdownOpen: false
    }
    render() {
        return (
            <div>
                <div className="header-container fixed-top">
                    <header className="header navbar navbar-expand-sm">

                        <ul className="navbar-item theme-brand flex-row  text-center">
                            <li className="nav-item theme-text">
                                <Link href="/" className="nav-link"> SPECTRUM </Link>
                            </li>
                        </ul>

                        <ul className="navbar-item flex-row ml-md-auto">

                            <li className="nav-item dropdown user-profile-dropdown">
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={()=>{
                                    this.setState({dropdownOpen: !this.state.dropdownOpen})
                                }}>
                                    <DropdownToggle className=" user" nav caret>
                                            <img src="/template/assets/img/90x90.jpg" alt="avatar" />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu position-absolute">
                                        <DropdownItem>
                                            <Link href="#"> <User/> Profile </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link href="#"> <LogOut/> Logout </Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                        </ul>
                    </header>
                </div>

                <div className="sub-header-container">
                    <header className="header navbar navbar-expand-sm">
                        <a href="#" className="sidebarCollapse" data-placement="bottom"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></a>
                        <ul className="navbar-nav flex-row">
                            <li>
                                <div className="page-header">
                                    <div className="page-title">
                                        <h3>Blank Page</h3>
                                    </div>
                                    {/* <nav class="breadcrumb-one" aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="javascript:void(0);">Dashboard</a></li>
                                            <li class="breadcrumb-item active" aria-current="page"><span>Sales</span></li>
                                        </ol>
                                    </nav> */}
                                </div>
                            </li>
                        </ul>
                    </header>
                </div>
            </div>
        )
    }
}

export default Navbar