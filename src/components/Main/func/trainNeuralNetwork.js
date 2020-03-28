import { getProportionsAll } from './index';


export const trainNeuralNetwork = async ({ state, net, ref }) => {
  const { poseOneData, poseTwoData } = state;
  const networkTrainData = [];

  for (let i = 0; i < poseOneData.length; i++) {
    const proportions = getProportionsAll(poseOneData[i]);
    networkTrainData.push({
      input: proportions, output: [0],
    });
  }

  for (let i = 0; i < poseTwoData.length; i++) {
    const proportions = getProportionsAll(poseTwoData[i]);
    networkTrainData.push({
      input: proportions, output: [1],
    });
  }

  await net.train(networkTrainData, {
    log: true,
    errorThresh: 0.01,
    learningRate: 0.001,
    iterations: 100000,
  });

  ref.setState({ canRecognize: true });
}
