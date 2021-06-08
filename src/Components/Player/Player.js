import React from "react";
import FontAwesome from "react-fontawesome"
import "./Player.css"

class Player extends React.Component {
    constructor(props){
        super(props)
        this.changeVolume = this.changeVolume.bind(this)
        this.pausePlay = this.pausePlay.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    renderButton() {
        if(this.props.isPause) {
            return <FontAwesome className="Player-Button" name="play-circle" size="2x" onClick={this.pausePlay}/>
        } else {
            return <FontAwesome className="Player-Button" name="pause-circle" size="2x" onClick={this.pausePlay}/>
        }
    }

    handleChange(event) {
        this.setState({trackProgress: event.target.value})
    }

    changeVolume(event) {
        console.log(event)
        this.props.onVolume(event.target.value)
    }

    pausePlay(){
        this.props.onPausePlay()
    }

    render() {
        return (
            <div className="Player">
                <div className="play player-item">
                    {this.renderButton()}
                </div>
                <div className="volume player-item">
                    <input onInput={this.changeVolume} className="Player-Volume" type="range" min="0" max="100"/>
                </div>
                <div className="progress player-item">
                    {this.props.currentTime}
                </div>
                <div className="slider player-item">
                    <input id="progress" className="progress-slider" type="range" value={this.props.trackProgress} onChange={this.handleChange} min="0" max="30.000000" step="any"/>
                </div>
                <div className="duration player-item">
                    0:30
                </div>
            </div>
        )
    }
}

export default Player;