const INITIAL_STATE = {readyThumbnails: false}

export default function(state = INITIAL_STATE, action) {
	switch (action.type){
		case 'THUMBNAILS_READY':
			return { ...state, readyThumbnails: action.payload}
		default:
			return state;
	}
}