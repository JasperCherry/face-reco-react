import React from 'react';
import {
  VideoOutput,
  PointsOutput,
} from './Video.styled';


class Video extends React.Component {
  render() {
    return (
      <div>
        <VideoOutput id="videoOutput" playsinline />
        <PointsOutput id="pointsOutput" />
      </div>
    );
  }
}


export default Video;
