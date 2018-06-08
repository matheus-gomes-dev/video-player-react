import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'
import '../css/custom.css'

import React from 'react'

import Video from '../video/video'
import Header from '../header/header'

export default props => (
	<div>
		<Header/>
    	<Video/>
    </div>
)