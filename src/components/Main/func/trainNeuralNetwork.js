import { getProportions } from './index';


export const trainNeuralNetwork = ({ state, net }) => {
  const { faceOneData, faceTwoData } = state;
  const networkTrainData = [];

  for (let i = 0; i < faceOneData.length; i++) {
    const proportions = getProportions(faceOneData[i]);
    networkTrainData.push({
      input: proportions, output: [0],
    });
  }

  for (let i = 0; i < faceTwoData.length; i++) {
    const proportions = getProportions(faceTwoData[i]);
    networkTrainData.push({
      input: proportions, output: [1],
    });
  }

  net.train(networkTrainData, { log: true });
}
