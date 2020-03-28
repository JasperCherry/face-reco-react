import { getProportionsAll } from './index';


export const recognizeCurrentPose = ({ state, net }) => {
  const { testData } = state;
  const proportions = getProportionsAll(testData);
  const output = net.run(proportions);
  document.getElementById('recognizedPose').innerHTML = `Recognized pose: ${Math.round(output[0]) ? 'pose two' : 'pose one'}`;
  console.log(`${output[0]} // if closer to 0 then pose one, closer to 1 then pose two // recognized pose: ${Math.round(output[0]) ? 'pose two' : 'pose one'}`);
}
