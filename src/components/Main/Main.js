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

    renderPrediction({ video, canvas, ctx, model, state });
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


  trainNeuralNetwork = async () => {
    const { faceOneData, faceTwoData } = state;
    const networkTrainData = [];

    for (let i = 0; i < faceOneData.length; i++) {
      const {leftEar, rightEar, leftEye, rightEye } = faceOneData[i];
      const earDistance = Math.sqrt(
        Math.pow((leftEar[0] - rightEar[0]), 2) + Math.pow((leftEar[1] - rightEar[1]), 2)
      );
      const eyeDistance = Math.sqrt(
        Math.pow((leftEye[0] - rightEye[0]), 2) + Math.pow((leftEye[1] - rightEye[1]), 2)
      );
      const proportion = eyeDistance / earDistance;
      networkTrainData.push({
        input: [proportion], output: [0],
      });
    }

    for (let i = 0; i < faceTwoData.length; i++) {
      const {leftEar, rightEar, leftEye, rightEye } = faceTwoData[i];
      const earDistance = Math.sqrt(
        Math.pow((leftEar[0] - rightEar[0]), 2) + Math.pow((leftEar[1] - rightEar[1]), 2)
      );
      const eyeDistance = Math.sqrt(
        Math.pow((leftEye[0] - rightEye[0]), 2) + Math.pow((leftEye[1] - rightEye[1]), 2)
      );
      const proportion = eyeDistance / earDistance;
      networkTrainData.push({
        input: [proportion], output: [1],
      });
    }

    net.train(networkTrainData, { log: true });
  }


  recognizeCurrentFace = async () => {
    state.recordingTestData = true;
    await wait(1000);

    const { leftEar, rightEar, leftEye, rightEye } = state.testData;
    const earDistance = Math.sqrt(
      Math.pow((leftEar[0] - rightEar[0]), 2) + Math.pow((leftEar[1] - rightEar[1]), 2)
    );
    const eyeDistance = Math.sqrt(
      Math.pow((leftEye[0] - rightEye[0]), 2) + Math.pow((leftEye[1] - rightEye[1]), 2)
    );

    const proportion = eyeDistance / earDistance;
    const output = net.run([proportion]);

    console.log(`Recognized face: ${Math.round(output[0]) ? 'Face two' : 'Face one'} ${output[0]}`);
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
            onClick={this.trainNeuralNetwork}
          >
            {`Train Neural Network`}
          </Button>
          <Button
            style={{ background: 'red' }}
            onClick={this.recognizeCurrentFace}
          >
            {`Recognize current face`}
          </Button>
        </div>
      </Layout>
    );
  }
}


export default Main;
