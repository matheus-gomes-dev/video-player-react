/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable import/no-extraneous-dependencies */

import styled from 'styled-components';

export const HotspotBox = styled.div`
  z-index: 100;
  position: absolute;
  bottom: 50px;
  background: #d9d9d9;
  border-radius: 15px;
  height: 200px;
  width: 250px;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 42px solid transparent;
    border-top-color: #d9d9d9;
    border-bottom: 0;
    border-left: 0;
    margin-left: -21px;
    margin-bottom: -42px;
  }
`;

export const HotspotThumbnail = styled.div`
  margin-top: 20px;
`;

export const HotspotDescription = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 10px;
  height: auto;
`;

export const Hotspot = styled.div`
  width: 15px;
  height: 19px;
  background-color: transparent;
  position: absolute;
  top: -7px;
  display: inline-block;
`;
