import React from "react";
import Track from "../Track/Track.js"
import "./Tracklist.css"


class Tracklist extends React.Component {


    render() {

        return(
            <div className="TrackList">
                <h1> 
                    {this.props.searchResults.map(track => {
                        return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
                    }) 
                    }
                </h1>
            </div>
        )
    }
}

export default Tracklist;