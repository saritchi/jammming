import React from "react";

class Playlist extends React.Component {
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'}/>
                {/* <!-- Add a TrackList component --> */}
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}