import {
  getProportion1,
  getProportion2,
  getProportion3,
} from './index';


export const recognizeCurrentFace = ({ state, net }) => {
  const { leftEar, rightEar, leftEye, rightEye, mouth, nose } = state.testData;
  const proportion1 = getProportion1({ leftEar, rightEar, leftEye, rightEye });
  const proportion2 = getProportion2({ leftEar, leftEye, nose, mouth });
  const proportion3 = getProportion3({ rightEar, rightEye, nose, mouth });
  const output = net.run([proportion1, proportion2, proportion3]);
  console.log(`Recognized face: ${Math.round(output[0]) ? 'Face two' : 'Face one'} ${output[0]}`);
}
