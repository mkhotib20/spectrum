import { Component } from "react"
import LaneItem from './LaneItem'
import Lanes from './Lanes'

class ScrumBoard extends Component
{
    render() {
        return (
            <div className="row scrumboard" id="cancel-row">
                <div className="col-lg-12 layout-spacing">
                    <div className="task-list-section">
                        <Lanes>
                            <LaneItem/>
                            <LaneItem/>
                        </Lanes>
                        <Lanes>
                            <LaneItem/>
                        </Lanes>
                    </div>
                </div>
            </div>
        )
    }
}

export default ScrumBoard