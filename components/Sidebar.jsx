import { Component } from "react";
import SidebarItem from "./SidebarItem";
import { Home, Plus, MessageCircle } from "react-feather";

class Sidebar extends Component
{
    state = {
        sidebarNav : [
            {
                label: "Home",
                url: "/",
                icon: Home,
                // child: [1,2,3]
            },
            {
                label: "Chats",
                url: "/chat",
                icon: MessageCircle,
                // child: [1,2,3]
            },
            {
                label: "About",
                url: "#",
                icon: Plus,
                child: [
                    {
                        label: "Home",
                        url: "#",
                    },
                ]
            }
        ]
    }
    render() {
        return (
            <div className="sidebar-wrapper sidebar-theme">
                    <nav id="sidebar">
                        <div className="shadow-bottom"></div>
                        <ul className="list-unstyled menu-categories">
                            {this.state.sidebarNav.map((val, idx) => {
                                return(
                                    <SidebarItem key={idx} 
                                        label={val.label}
                                        url={val.url}
                                        icon={val.icon}
                                        child={val.child ? val.child : []} 
                                    />
                                )
                            })}
                        </ul>
                    </nav>
                </div>
        )
    }
}

export default Sidebar