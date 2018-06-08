/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Hotspots from '../hotspots/hotspots';
import PlayerController from '../playerController/playerController';
import Icon from '../common/iconButton';
import { pauseVideo, playVideo, videoSeeking } from '../video/videoActions';
import { thumbnailsReady } from './timelineActions';
import { getParameterByName } from '../common/utils';
import config from '../../config/config';
import { SpeechBubble, TimelineDiv } from './timelineStyles';

const loadLocalStorage = () => {
  const storedHotspots = localStorage.getItem('react_video_player_hotspots');
  return (storedHotspots === null ? storedHotspots : JSON.parse(storedHotspots));
};

const positionToTime = (videoDuration, timelinePosition, timelineWidth) =>
  ((timelinePosition * videoDuration) / timelineWidth);

const instantToPosition = (currentTime, duration, timelineWidth = 800, offset = 0) => {
  if (!duration) {
    return '0px';
  }
  const position = (currentTime * timelineWidth) / duration;
  if (position < 0) {
    return '0px';
  }
  return `${position - offset}px`;
};


class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotspotDescription: '',
      newHotspotBox: 'none',
      hotspots: [],
      waitingThumbnail: false,
    };
    this.inputingHotspotDescription = this.inputingHotspotDescription.bind(this);
    this.showHotspotBox = this.showHotspotBox.bind(this);
    this.hideHotspotBox = this.hideHotspotBox.bind(this);
    this.addHotspot = this.addHotspot.bind(this);
    this.createThumbnail = this.createThumbnail.bind(this);
    this.loadThumbnails = this.loadThumbnails.bind(this);
    this.thumbnailsDidLoaded = this.thumbnailsDidLoaded.bind(this);
    this.timelineClick = this.timelineClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.state.newHotspotBox === 'block' && !this.props.isPaused) {
      this.hideHotspotBox();
    }
    if (!this.props.readyThumbnails && this.props.isReady && !this.state.waitingThumbnail) {
      // video loaded, and thumbnails not rendered yet. Trigger thumbnails loading
      this.loadThumbnails();
    } else if (!this.props.readyThumbnails && this.props.isReady && this.state.waitingThumbnail &&
    (prevProps.isSeeking && !this.props.isSeeking)) {
      // thumbnails pending to be rendered
      this.createThumbnail();
    }
  }

  timelineClick(e) {
    const nextMarkerPosition =
      e.clientX - document.getElementById(config.TIMELINE_BAR_ID).offsetLeft;
    // return if user wants to add new hotspot
    if (this.state.newHotspotBox === 'block') {
      return;
    }
    const videoTime = positionToTime(
      this.props.videoDuration,
      nextMarkerPosition,
      config.TIMELINE_WIDTH,
    );
    const video = document.getElementById(config.VIDEO_ID);
    video.currentTime = videoTime;
  }

  thumbnailsDidLoaded() {
    const time = getParameterByName('time');
    const video = document.getElementById(config.VIDEO_ID);
    const storedHotspots = loadLocalStorage();
    video.currentTime = time;
    this.props.videoSeeking();
    this.props.thumbnailsReady();
    if (storedHotspots) {
      this.setState({ ...this.state, hotspots: storedHotspots });
    }
  }

  // load thumbnails from localStorage
  loadThumbnails() {
    const storedHotspots = loadLocalStorage();
    // no stored thumbnails
    if (storedHotspots === null) {
      this.thumbnailsDidLoaded();
      return;
    }
    const video = document.getElementById(config.VIDEO_ID);
    for (let i = 0; i < storedHotspots.length; i += 1) {
      const candidateThumbnail = document.getElementById(storedHotspots[i].thumbnail_id);
      if (candidateThumbnail == null) {
        video.currentTime = storedHotspots[i].videoTime;
        this.setState({ ...this.state, waitingThumbnail: storedHotspots[i].thumbnail_id });
        return;
      }
    }
    // at this point, thumbnails are ready!
    this.thumbnailsDidLoaded();
  }

  createThumbnail(thumbnailId) {
    const video = document.getElementById(config.VIDEO_ID);
    const timelineTumbnail = document.getElementById(config.TIMELINE_THUMBNAILS_ID);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;
    canvas.id = (!thumbnailId) ? this.state.waitingThumbnail : thumbnailId;
    setTimeout(() => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      timelineTumbnail.appendChild(canvas);
      this.setState({ ...this.state, waitingThumbnail: false });
    }, 300);
  }

  addHotspot() {
    const id = Math.floor((Math.random() * 10000) + 1);
    const newHotSpot = [{
      description: this.state.hotspotDescription,
      iconPosition: instantToPosition(
        this.props.currentTime,
        this.props.videoDuration,
        config.TIMELINE_WIDTH,
        5,
      ),
      boxPosition: instantToPosition(
        this.props.currentTime,
        this.props.videoDuration,
        config.TIMELINE_WIDTH,
        105,
      ),
      videoTime: this.props.currentTime,
      id: `hotspot_id_${id}`,
      thumbnail_id: `thumbnail_id_${id}`,
    }];
    const hotspotsArray = [...this.state.hotspots, ...newHotSpot]
    this.setState({ ...this.state, hotspots: hotspotsArray, hotspotDescription: '' });
    this.createThumbnail(`thumbnail_id_${id}`);
    this.props.playVideo();
    localStorage.setItem('react_video_player_hotspots', JSON.stringify(hotspotsArray));
  }

  showHotspotBox() {
    if (this.state.newHotspotBox === 'block') {
      return;
    }
    this.props.pauseVideo();
    this.setState({ ...this.state, newHotspotBox: 'block' });
  }

  hideHotspotBox() {
    if (this.state.newHotspotBox === 'none') {
      return;
    }
    this.setState({ ...this.state, newHotspotBox: 'none' });
    this.props.playVideo();
  }

  inputingHotspotDescription(e) {
    if (e.target.value.split('').length > 50) {
      return;
    }
    this.setState({ ...this.state, hotspotDescription: e.target.value });
  }

  render() {
    const { timeline, marker } = this.props.widths;
    const { currentTime, videoDuration, isPaused } = this.props;
    const { hotspotDescription, hotspots, newHotspotBox } = this.state;
    return (
      <div>
        <TimelineDiv id="timelineDiv">
          <div
            className="timelineBar"
            id={config.TIMELINE_BAR_ID}
            style={{ width: `${timeline}px` }}
            onClick={this.timelineClick}
            role="presentation"
          >
            <div
              className="marker"
              onClick={() => this.showHotspotBox()}
              role="presentation"
              style={{
                left: instantToPosition(
                  currentTime,
                  videoDuration,
                  config.TIMELINE_WIDTH,
                  marker / 2,
                ),
                width: `${marker}px`,
              }}
            />
            {hotspots.map(hotspot => (
              <Hotspots
                hotspot={hotspot}
                key={hotspot.id}
              />
            ))}
            <SpeechBubble
              style={{
                display: newHotspotBox,
                left: instantToPosition(currentTime, videoDuration, config.TIMELINE_WIDTH, 105),
              }}
            >
              <div className="input-area">
                <input type="text" value={hotspotDescription} onChange={this.inputingHotspotDescription} placeholder="Add annotation" />
              </div>
              <div className="control-btns text-center">
                <button
                  className="btn btn-default"
                  onClick={() => this.hideHotspotBox()}
                >
                  <span>Cancel</span>
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => this.addHotspot()}
                  disabled={hotspotDescription ? false : true}
                >
                  <Icon icon="plus" id="addIcon" />
                  <span>Add</span>
                </button>
              </div>
            </SpeechBubble>
          </div>
          <div id={config.TIMELINE_THUMBNAILS_ID} />
        </TimelineDiv>
        <PlayerController
          currentTime={currentTime}
          videoDuration={videoDuration}
          isPaused={isPaused}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentTime: state.video.currentTime,
  isPaused: state.video.isPaused,
  isReady: state.video.isReady,
  isSeeking: state.video.isSeeking,
  readyThumbnails: state.timeline.readyThumbnails,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  pauseVideo,
  playVideo,
  thumbnailsReady,
  videoSeeking,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
