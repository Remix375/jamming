import React from "react"
import './App.css';

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist"

import Spotify from "../../util/Spotify"


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],

      playlistName: "Playlist Name",

      playlistTracks: []
    }


    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);

    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this);

  }



  addTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    let unique = true;


    playlistTracks.forEach(song => {
      if (song.id === track.id) {
        unique = false
      }
    });


    if(unique) {
      playlistTracks.push(track)

      this.setState({
        playlistTracks
      })
    }
  }






  removeTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    
    let newPlaylistTrack = [];


    playlistTracks.forEach(song => {
      if (song.id !== track.id) {
        newPlaylistTrack.push(song)
      }
    });

    this.setState({
      playlistTracks: newPlaylistTrack
    })
  }



  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }





  savePlaylist() {
    let trackURIs = []

    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri)
    })

    Spotify.savePlaylist(this.state.playlistName, trackURIs)


    this.setState({
      playlistTracks: [],
      playlistName: "New Playlist"
    })
  }


  search(searchTerm) {
    Spotify.search(searchTerm)
    .then(songs => {
      this.setState({
        searchResults: songs
      })
    })
  }





  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}
          />
          <div className="App-playlist">

            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
              />


            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist}
            />

          </div>
        </div>
      </div>
    )
  }
}


export default App;
