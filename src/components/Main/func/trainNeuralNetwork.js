export const trainNeuralNetwork = ({ state, net }) => {
  const { faceOneData, faceTwoData } = state;
  const networkTrainData = [];

  // todo - many proportions

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
