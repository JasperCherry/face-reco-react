import {
  getProportion1,
  getProportion2,
  getProportion3,
} from './index';


export const trainNeuralNetwork = ({ state, net }) => {
  const { faceOneData, faceTwoData } = state;
  const networkTrainData = [];

  for (let i = 0; i < faceOneData.length; i++) {
    const { leftEar, rightEar, leftEye, rightEye, mouth, nose } = faceOneData[i];
    const proportion1 = getProportion1({ leftEar, rightEar, leftEye, rightEye });
    const proportion2 = getProportion2({ leftEar, leftEye, nose, mouth });
    const proportion3 = getProportion3({ rightEar, rightEye, nose, mouth });
    networkTrainData.push({
      input: [proportion1, proportion2, proportion3], output: [0],
    });
  }

  for (let i = 0; i < faceTwoData.length; i++) {
    const { leftEar, rightEar, leftEye, rightEye, mouth, nose } = faceTwoData[i];
    const proportion1 = getProportion1({ leftEar, rightEar, leftEye, rightEye });
    const proportion2 = getProportion2({ leftEar, leftEye, nose, mouth });
    const proportion3 = getProportion3({ rightEar, rightEye, nose, mouth });
    networkTrainData.push({
      input: [proportion1, proportion2, proportion3], output: [1],
    });
  }

  net.train(networkTrainData, { log: true });
}
