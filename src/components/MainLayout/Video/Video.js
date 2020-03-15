import React from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs-core';
import {
  setupCamera,
  renderPrediction,
} from './func';
import {
  VideoOutput,
  PointsOutput,
} from './Video.styled';


class Video extends React.Component {
  componentDidMount = async () => {
    await tf.setBackend('webgl');

    const video = await setupCamera();
    video.play();

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    video.width = videoWidth;
    video.height = videoHeight;

    const canvas = document.getElementById('pointsOutput');
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";

    const model = await blazeface.load();

    renderPrediction({ video, canvas, ctx, model });
  }


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
