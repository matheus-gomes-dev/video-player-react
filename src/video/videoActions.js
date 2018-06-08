import config from '../../config/config'


export function getVideoTime() {
	const video = document.getElementById(config.VIDEO_ID);
	return{
		type: 'VIDEO_TIME',
		payload: video.currentTime
	}
}

export function pauseVideo(){
	const video = document.getElementById(config.VIDEO_ID);
	video.pause();
	return{
		type: 'VIDEO_PAUSE',
		payload: true
	}
}

export function playVideo(){
	const video = document.getElementById(config.VIDEO_ID);
	video.play();
	return{
		type: 'VIDEO_PLAY',
		payload: false
	}
}

export function videoReady(){
	return{
		type: 'VIDEO_READY',
		payload: true
	}
}

export function videoSeeking(){
	return{
		type: 'VIDEO_SEEKING',
		payload: true
	}
}

export function videoSeeked(){
	return{
		type: 'VIDEO_SEEKED',
		payload: false
	}
}