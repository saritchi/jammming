import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Player from "../Player/Player"
import Spotify from "../../util/Spotify"
import './App.css';
import React from "react";

Spotify.getAccessToken();
let audio = new Audio();
let intervalRef;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: [],
      pause: false,
      currentTime: "0:00",
      trackProgress: 0
    }
    this.pausePlayTrack = this.pausePlayTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.listenTrack = this.listenTrack.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.timer = this.timer.bind(this);
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

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  listenTrack(url) {
    if(audio.src != null){
      audio.pause();
      audio.src = null
    }
    audio.src = url;
    audio.play();
    this.timer(true);
  }

  updateTime(){
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = "0" +  Math.floor(audio.currentTime - minutes * 60);
    const progress = `${minutes}:${seconds.substr(-2)}`
    console.log(progress)
    this.setState({currentTime: progress, trackProgress: audio.currentTime})
    if(audio.currentTime === audio.duration){
      this.setState({pause: false})
      this.timer(false);
    }
  }

  timer(time){
    if(time) {
      clearInterval(this.updateTime)
      intervalRef = setInterval(this.updateTime, 100)
    } else {
      clearInterval(intervalRef)
    }

  }

  pausePlayTrack(){
    if(!this.state.pause){
      audio.pause();
      this.timer(false);
      this.setState({pause: true})
    } else {
      this.timer(true);
      audio.play();
      this.setState({pause: false})
    }
  }

  changeVolume(value) {
    audio.volume = value / 100;
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onListen={this.listenTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} onListen={this.listenTrack}/>
          </div>
        </div>
        <div className="App-player">
          <Player onVolume={this.changeVolume} onPausePlay={this.pausePlayTrack} isPause={this.state.pause} currentTime={this.state.currentTime} trackProgress={this.state.trackProgress}/>
        </div>
      </div>
    );
  }
}

export default App;
