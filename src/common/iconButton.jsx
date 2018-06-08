import React from 'react'

export default props => (
    <i className={`fa fa-${props.icon} ${props.styledIcon} fa-fw`} onClick={props.onClick}/>
)
