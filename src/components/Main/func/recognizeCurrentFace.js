import { wait } from './index';


export const recognizeCurrentFace = ({ state, net }) => {
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
