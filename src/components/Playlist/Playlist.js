import React from "react";
import "./Playlist.css"
import TrackList from "../Tracklist/Tracklist.js";

class Playlist extends React.Component {


    render() {
        return (
            <div className="Playlist">
                <input defaultValue={"New Playlist"}/>
                <TrackList searchResults={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
export default Playlist;