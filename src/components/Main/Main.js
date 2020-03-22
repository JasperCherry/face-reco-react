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
  trainNeuralNetwork,
} from './func';
import {
  Button,
  Layout,
} from './Main.styled';


const config = {
  hiddenLayers: [20, 20],
  activation: 'sigmoid',
}


const net = new brain.NeuralNetwork(config);


const state = {
  faceOneData: [],
  faceTwoData: [],
  testData: null,
  recordingFaceOne: false,
  recordingFaceTwo: false,
  recordingTestData: false,
}


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canTrain: false,
      canRecognize: false,
    }
  }


  componentDidMount = async () => {
    await tf.setBackend('webgl');

    const video = await setupCamera();
    const canvas = getCanvas({ video });
    const ctx = getCtx({ canvas });
    const model = await blazeface.load();

    video.play();

    const ref = this;

    renderPrediction({ video, canvas, ctx, model, state, net, ref });
  }


  recordFaceOneData = async () => {
    state.recordingFaceOne = true;
  }


  recordFaceTwoData = async () => {
    state.recordingFaceTwo = true;
  }


  showRecordedData = () => {
    const { faceOneData, faceTwoData } = state;
    console.log({ faceOneData, faceTwoData });
  }


  render() {
    const { canTrain, canRecognize } = this.state;

    return (
      <Layout>
        <Video />
        <div>
          <Button onClick={this.recordFaceOneData}>{`Record face One`}</Button>
          <Button onClick={this.recordFaceTwoData}>{`Record face Two`}</Button>
          <Button onClick={this.showRecordedData}>{`Show recorded data`}</Button>
        </div>
        <div>
          <Button
            disabled={!canTrain}
            style={{ background: canTrain ? 'green' : 'gray' }}
            onClick={() => trainNeuralNetwork({ state, net, ref: this })}
          >
            {`Train Neural Network`}
          </Button>
          <Button
            disabled={!canRecognize}
            style={{ background: canRecognize ? 'green' : 'gray' }}
            onClick={() => { state.recordingTestData = true; }}
          >
            {`Recognize current face`}
          </Button>
          <h1 id='recognizedFace'>Recognized face: none</h1>
        </div>
      </Layout>
    );
  }
}


export default Main;
