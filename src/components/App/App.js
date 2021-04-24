import React from "react"
import './App.css';

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist"


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [{
        name: "best song",
        artist: "Remi",
        album: "best Album",
        uri: 23232,
        id:1
      },
      {
        name: "love song",
        artist: "still me",
        album: "same one",
        uri: 23232,
        id:2
      },
      {
        name: "rap song",
        artist: "still the same",
        album: "same",
        uri: 23232,
        id:3
      }
    ],

    playlistName: "Playlist Name",

    playlistTracks: [{
      name: "best song",
      artist: "Remi",
      album: "best Album",
      uri: 23232,
      id:1
    }]
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
    console.log(trackURIs)

  }


  search(searchTerm) {
    console.log(searchTerm)
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
