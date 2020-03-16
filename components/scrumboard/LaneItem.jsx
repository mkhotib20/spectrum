import { Component } from "react";
import Draggable from "react-draggable";

class LaneItem extends Component
{
    state={
        initX: 0,
        initY: 0
    }
    componentDidMount(){

        let container = this.dragable.current
        
    }
    constructor(props) {
        super(props);
        this.dragable = React.createRef()
    }
    
    render(){
        return(
            <Draggable>
                <div draggable={true} onDragStart={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                }} ref={this.dragable} className="card img-task" >
                    <div className="card-body">
                        <div className="task-content">
                            <img src="/template/assets/img/400x168.jpg" className="img-fluid" alt="scrumboard"/>
                        </div>

                        <div className="task-header">
                            <div className="">
                                <h4>Creating a new Portfolio on Dribble</h4>
                            </div>
                        </div>

                        <div className="task-body">                                                
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    }
}

export default LaneItem