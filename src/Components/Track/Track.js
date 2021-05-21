import React from "react";
import "./Track.css";

class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.listenTrack = this.listenTrack.bind(this)
    }

    renderAction() {
        if(this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>;
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>;
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    listenTrack() {
        this.props.onListen(this.props.track.previewUrl)
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-Art" onClick={this.listenTrack}>
                    <img src={this.props.track.image} alt='' />
                </div>
                <div className="Track-information" onClick={this.listenTrack}>
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;