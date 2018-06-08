import React, { Component } from 'react'
import Icon from '../common/iconButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import config from '../../config/config'
import { pauseVideo, playVideo } from '../video/videoActions'
import { PlayerControllerDiv } from './playerControllerStyles'

class PlayerController extends Component{

	constructor(props){
		super(props);
		this.state = {videoVolume: 100, isMuted: false, storedVolume: 100}
		this.toMinutes = this.toMinutes.bind(this);
		this.changeVolume = this.changeVolume.bind(this);
		this.switchVolume = this.switchVolume.bind(this);
		this.switchPlay = this.switchPlay.bind(this);
		this.evaluateVolume = this.evaluateVolume.bind(this);
	}

	switchPlay(){
		if(this.props.isPaused){
			this.props.playVideo();
			return
		}
		this.props.pauseVideo();
		return;
	}

	switchVolume(){
		const video = document.getElementById(config.VIDEO_ID);
		if(this.state.isMuted){
			video.volume = this.state.storedVolume/100;
			this.setState({...this.state, isMuted: false, videoVolume: this.state.storedVolume})
			return;
		}
		this.setState({...this.state, isMuted: true, videoVolume: 0})
		video.volume = 0;
		return;
	}

	evaluateVolume(){
		if(this.state.videoVolume > 50)
			return 'volume-up';
		return 'volume-down';
	}

	changeVolume(e){
		const video = document.getElementById(config.VIDEO_ID);
		video.volume = e.target.value/100;
		this.setState({...this.state, videoVolume: e.target.value, storedVolume: e.target.value});
		//this.updateVolumeIcon(e.target.value);
	}

	toMinutes(time){
		if(!time)
			return '0:00'
		const minutes = Math.floor(time/60);
		const seconds = Math.floor(time - (60*minutes));
		return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
	}


	render(){
		const { isPaused, currentTime, videoDuration } = this.props;
		const { isMuted, videoVolume } = this.state;
		return(
			<PlayerControllerDiv className="text-center">
				<div className="player-timer">
					<Icon icon={!isPaused ? 'pause' : 'play'} style="play-btn" onClick={() => this.switchPlay()}/>
					<span>{`${this.toMinutes(currentTime)} / ${this.toMinutes(videoDuration)}`}</span>
				</div>
				<div className="player-volume-icon">
					<Icon icon={(isMuted || !Number(videoVolume)) ? 'volume-off' : this.evaluateVolume()} onClick={() => this.switchVolume()}/>
				</div>
				<div className="player-volume-input">
					<input value={videoVolume} onChange={this.changeVolume} type="range" min="0" max="100"/>
				</div>
			</PlayerControllerDiv>
		)
	}
}

const mapStateToProps = state => ({
	isPaused: state.video.isPaused
});
const mapDispatchToProps = dispatch => bindActionCreators({pauseVideo, playVideo}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PlayerController)