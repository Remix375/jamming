import React from "react";
import "./Playlist.css"
import TrackList from "../Tracklist/Tracklist.js";

class Playlist extends React.Component {
    constructor(props) {
        super(props)

        this.handleNameChange = this.handleNameChange.bind(this)
    }



    handleNameChange(e) {
        this.props.onNameChange(e.target.value)
    }


    render() {
        return (
            <div className="Playlist">
                <input defaultValue={this.props.playlistName} onChange={this.handleNameChange}/>
                <TrackList searchResults={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
export default Playlist;