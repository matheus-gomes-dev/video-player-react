//src="https://ia801600.us.archive.org/27/items/Woody_Woodpecker/Woody.01/01.Life%20Begins%20for%20Andy%20Panda.mp4"

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components';

import { getVideoTime, pauseVideo, playVideo, videoReady, videoSeeking, videoSeeked } from './videoActions'
import { thumbnailsReady } from '../timeline/timelineActions'
import Timeline from '../timeline/timeline'
import config from '../../config/config'
import { VideoWindow, Loader } from './videoStyles'

class Video extends Component{

	constructor(props){
		super(props);
		this.state = {videoDuration: null, showVideo: false, videoURL: ''};
		this.onLoadedVideo = this.onLoadedVideo.bind(this);
		this.onVideoProgress = this.onVideoProgress.bind(this);
		this.onVideoPause = this.onVideoPause.bind(this);
		this.onVideoPlay = this.onVideoPlay.bind(this);
		this.onVideoSeeking = this.onVideoSeeking.bind(this);
		this.onVideoSeeked = this.onVideoSeeked.bind(this);
	}

	componentDidUpdate(prevProps){
		//thumbnails are ready, video will be displayed!
		if(this.props.readyThumbnails && !this.props.isSeeking && !this.state.showVideo){
			this.setState({...this.state, showVideo: true})
		}
	}

	componentWillMount(){
		const url = localStorage.getItem('react_video_player_videoURL');
		this.setState({...this.state, videoURL: (url === null ? config.VIDEO_DEFAULT_URL : url)})
	}

	onVideoSeeking(){
		this.props.videoSeeking();
	}

	onVideoSeeked(){
		this.props.videoSeeked();
	}

	onVideoProgress(){
		this.props.getVideoTime();
	}

	onVideoPause(){
		this.props.pauseVideo();
	}

	onVideoPlay(){
		this.props.playVideo();
	}

	onLoadedVideo(){
		const video = document.getElementById(config.VIDEO_ID);
		this.setState({...this.state, videoDuration: video.duration});
		this.props.videoReady();
	}

	render(){
		return(
			<div>
				<div style={{display: (this.state.showVideo ? 'block' : 'none')}}>
			    	<div className="text-center">
					    <VideoWindow
					    	id={config.VIDEO_ID}
					    	onLoadedData = {() => this.onLoadedVideo()}
					    	onTimeUpdate = {() => this.onVideoProgress()}
					    	onPause = {() => this.onVideoPause()}
					    	onPlay = {() => this.onVideoPlay()}
					    	onSeeking = {() => this.onVideoSeeking()}
					    	onSeeked = {() => this.onVideoSeeked()}
					    	src={this.state.videoURL}
					    	controls={false}
					    />
					</div>
					<Timeline
						videoDuration={this.state.videoDuration}
						widths={{timeline: config.TIMELINE_WIDTH, marker:"10"}}
					/>
				    <div className="thumbnails" id="thumbnails"/>
				</div>
				<Loader className="text-center" style={{display: (!this.state.showVideo ? 'block' : 'none')}}>
				    <i className="fa fa-circle-o-notch fa-spin"></i>
				</Loader>
			</div>
		)
	}
}

const mapStateToProps = state => ({readyThumbnails: state.timeline.readyThumbnails, isSeeking: state.video.isSeeking});
const mapDispatchToProps = dispatch => bindActionCreators({getVideoTime, pauseVideo, playVideo, videoReady, videoSeeking, videoSeeked}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Video)