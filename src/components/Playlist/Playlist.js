import React from "react";
import "./Playlist.css"
import TrackList from "../Tracklist/Tracklist.js";

class Playlist extends React.Component {


    render() {
        return (
            <div className="Playlist">
                <input value="New Playlist"/>
                <TrackList />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}