import React from "react";
import Track from "../Track/Track"
import "./TrackList.css"

class TrackList extends React.Component {
    render() {
        return (
            <div class="TrackList">
                {this.props.tracks.map(track => <Track key={track.id} track={track} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval}/>)}
            </div>
        );
    }
}

export default TrackList;