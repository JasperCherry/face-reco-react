import React from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs-core';
import brain from 'brain.js';
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
