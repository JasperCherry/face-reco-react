import React, { Component } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs-core';
import brain from 'brain.js';
import { Video } from './Video';
import {
  setupCamera,
  renderPrediction,
  getCanvas,
  getCtx,
} from './func';


class Main extends Component {
  componentDidMount = async () => {
    await tf.setBackend('webgl');

    const video = await setupCamera();
    const canvas = getCanvas({ video });
    const ctx = getCtx({ canvas });
    const model = await blazeface.load();

    video.play();

    renderPrediction({ video, canvas, ctx, model });
  }


  render() {
    return (
      <div>
        <Video />
      </div>
    );
  }
}


export default Main;
