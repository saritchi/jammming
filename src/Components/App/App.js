import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import './App.css';
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: {
        name: "Wet Dreamz",
        artist: "J Cole",
        album: "2014 Forest Hills Drive",
        id: "3"
      }
    }
  }
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
