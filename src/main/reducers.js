import { combineReducers } from 'redux'

import VideoReducer from '../video/videoReducer'
import TimelineReducer from '../timeline/timelineReducer'

const rootReducer = combineReducers({
	video: VideoReducer,
	timeline: TimelineReducer
})

export default rootReducer