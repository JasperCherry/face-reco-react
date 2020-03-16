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
  wait,
  trainNeuralNetwork,
} from './func';
import {
  Button,
  Layout,
} from './Main.styled';


const net = new brain.NeuralNetwork();

const state = {
  faceOneData: [],
  faceTwoData: [],
  testData: null,
  recordingFaceOne: false,
  recordingFaceTwo: false,
  recordingTestData: false,
}


class Main extends Component {
  componentDidMount = async () => {
    await tf.setBackend('webgl');

    const video = await setupCamera();
    const canvas = getCanvas({ video });
    const ctx = getCtx({ canvas });
    const model = await blazeface.load();

    video.play();

    renderPrediction({ video, canvas, ctx, model, state, net });
  }


  recordFaceOneData = async () => {
    state.recordingFaceOne = true;
    await wait(3000);
    state.recordingFaceOne = false;
    alert('Finished recording face one');
  }


  recordFaceTwoData = async () => {
    state.recordingFaceTwo = true;
    await wait(3000);
    state.recordingFaceTwo = false;
    alert('Finished recording face two');
  }


  showRecordedData = () => {
    const { faceOneData, faceTwoData } = state;
    console.log({ faceOneData, faceTwoData });
  }

  render() {
    return (
      <Layout>
        <Video />
        <div>
          <Button onClick={this.recordFaceOneData}>{`Record face One (3sec)`}</Button>
          <Button onClick={this.recordFaceTwoData}>{`Record face Two (3sec)`}</Button>
          <Button onClick={this.showRecordedData}>{`Show recorded data`}</Button>
        </div>
        <div>
          <Button
            style={{ background: 'red' }}
            onClick={() => trainNeuralNetwork({ state, net })}
          >
            {`Train Neural Network`}
          </Button>
          <Button
            style={{ background: 'red' }}
            onClick={() => {
              state.recordingTestData = true; }
            }
          >
            {`Recognize current face`}
          </Button>
        </div>
      </Layout>
    );
  }
}


export default Main;
