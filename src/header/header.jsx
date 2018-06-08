import React, { Component } from 'react'
import { Navbar } from './headerStyles'

class Header extends Component{

	constructor(props){
		super(props);
		this.state = {videoURL: ''}
		this.inputingVideoURL = this.inputingVideoURL.bind(this);
		this.changeVideo = this.changeVideo.bind(this);
	}

	inputingVideoURL(e){
		this.setState({...this.state, videoURL: e.target.value})
	}

	//previously stored hotspots will be lost!
	changeVideo(){
		localStorage.clear();
		localStorage.setItem('react_video_player_videoURL', this.state.videoURL);
	}

	render(){
		return(
			<Navbar className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<span className="navbar-brand">React Video Player</span>
					</div>
					<div className="nav-form">
						<form className="navbar-form navbar-left" role="search">
			  				<div className="form-group">
			    				<input
			    					type="text"
			    					value={this.state.videoURL}
			    					className="form-control"
			    					placeholder="myvideo.mp4"
			    					onChange={this.inputingVideoURL}
			    				/>
			  				</div>
			  				<button
			  					type="submit"
			  					className="btn btn-success"
			  					disabled={this.state.videoURL ? false : true}
			  					onClick={() => this.changeVideo()}>
			  					Go!
			  				</button>
						</form>
					</div>
				</div>
			</Navbar>
		)
	}
}

export default Header