const INITIAL_STATE = {currentTime: 0, isPaused: true, isReady: false, isSeeking: false}

export default function(state = INITIAL_STATE, action) {
	switch (action.type){
		case 'VIDEO_TIME':
			return { ...state, currentTime: action.payload}
		case 'VIDEO_PAUSE':
			return { ...state, isPaused: action.payload}
		case 'VIDEO_PLAY':
			return { ...state, isPaused: action.payload}
		case 'VIDEO_LOADING':
			return { ...state, isReady: action.payload}
		case 'VIDEO_READY':
			return { ...state, isReady: action.payload}
		case 'VIDEO_SEEKING':
			return { ...state, isSeeking: action.payload}
		case 'VIDEO_SEEKED':
			return { ...state, isSeeking: action.payload}
		default:
			return state;
	}
}