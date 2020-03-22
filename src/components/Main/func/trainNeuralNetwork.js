import { getProportions } from './index';


export const trainNeuralNetwork = async ({ state, net, ref }) => {
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

  await net.train(networkTrainData, {
    log: true,
    errorThresh: 0.005,
    learningRate: 0.01,
    iterations: 100000,
  });

  ref.setState({ canRecognize: true });
}
