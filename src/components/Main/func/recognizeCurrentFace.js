import { getProportionsAll } from './index';


export const recognizeCurrentFace = ({ state, net }) => {
  const { testData } = state;
  const proportions = getProportionsAll(testData);
  const output = net.run(proportions);
  document.getElementById('recognizedFace').innerHTML = `Recognized face: ${Math.round(output[0]) ? 'face two' : 'face one'}`;
  console.log(`${output[0]} // if closer to 0 then face one, closer to 1 then face two // recognized face: ${Math.round(output[0]) ? 'face two' : 'face one'}`);
}
