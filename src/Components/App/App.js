import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import './App.css';
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: "Wet Dreamz",
        artist: "J Cole",
        album: "2014 Forest Hills Drive",
        id: "3"
      }],
      playlistName: "2021 Jams",
      playlistTracks: [{
        name: "One More Time",
        artist: "Daft Punk",
        album: "Discovery",
        id: "1"
      },
      {
        name: "Digital Love",
        artist: "Daft Punk",
        album: "Discovery",
        id: "3"
      }]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track]
      }));
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
