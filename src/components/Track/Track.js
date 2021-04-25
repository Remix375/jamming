import React from "react";
import "./Track.css";


class Track extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }

        this.renderAction = this.renderAction.bind(this)
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
    }


    addTrack() {
        this.props.onAdd(this.props.track)
    }

    removeTrack() {
        this.props.onRemove(this.props.track)
    }





    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    render() {
        let track = this.props.track;
        return (
            <div className="Track">
                <img src={track.image}></img>
                <div className="Track-information">
                    
                    <h3>{track.name}</h3>
                    <p> {track.artist} {track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track