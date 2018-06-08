/* eslint camelcase: ["error", {properties: "never"}] */
/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import Icon from '../common/iconButton';
import { Hotspot, HotspotBox, HotspotThumbnail, HotspotDescription } from './hotspotsStyles';

let hotspotTimeout;

class Hotspots extends Component {
  constructor(props) {
    super(props);
    this.state = { hotspotOpacity: 0, hotspotDisplay: 'none' };
    this.showHotspotData = this.showHotspotData.bind(this);
    this.hideHotspotData = this.hideHotspotData.bind(this);
    this.clickHotspot = this.clickHotspot.bind(this);
  }

  clickHotspot() {
    let redirectURL = window.location.href;
    redirectURL = redirectURL.replace(window.location.search, '');
    redirectURL += `?time=${this.props.hotspot.videoTime}`;
    window.location.href = redirectURL;
  }

  showHotspotData() {
    clearTimeout(hotspotTimeout);
    const canvas = document.getElementById(this.props.hotspot.thumbnail_id);
    const hotspotThumbnail = document.getElementById(`hotspot_${this.props.hotspot.thumbnail_id}`);
    hotspotThumbnail.appendChild(canvas);
    this.setState({ ...this.state, hotspotDisplay: 'block' });
    for (let opacity = 0; opacity < 1; opacity += 0.1) {
      hotspotTimeout = setTimeout(() => {
        this.setState({ ...this.state, hotspotOpacity: opacity });
      }, opacity * 1000);
    }
  }

  hideHotspotData() {
    clearTimeout(hotspotTimeout);
    for (let opacity = 1; opacity >= 0; opacity -= 0.1) {
      hotspotTimeout = setTimeout(() => {
        this.setState({ ...this.state, hotspotOpacity: opacity });
        if (opacity < 0.2) {
          this.setState({ ...this.state, hotspotDisplay: 'none' });
        }
      }, (1 - opacity) * 500);
    }
  }

  render() {
    // https://reactjs.org/docs/typechecking-with-proptypes.html
    const { boxPosition, description, iconPosition, thumbnail_id } = this.props.hotspot;
    const { hotspotOpacity, hotspotDisplay } = this.state;
    return (
      <div>
        <HotspotBox
          style={{
            left: boxPosition,
            opacity: hotspotOpacity,
            display: hotspotDisplay,
          }}
        >
          <div className="text-center">
            <HotspotThumbnail id={`hotspot_${thumbnail_id}`} />
            <HotspotDescription>
              <i>{description}</i>
            </HotspotDescription>
          </div>
        </HotspotBox>
        <Hotspot
          style={{ left: iconPosition }}
          onMouseEnter={() => this.showHotspotData()}
          onMouseLeave={() => this.hideHotspotData()}
          onClick={() => this.clickHotspot()}
        >
          <Icon icon="star" styledIcon="yellow" />
        </Hotspot>
      </div>
    );
  }
}

export default Hotspots;
