import { getProportions } from './index';


export const recognizeCurrentFace = ({ state, net }) => {
  const { testData } = state;
  const proportions = getProportions(testData);
  const output = net.run(proportions);
  console.log(`Recognized face: ${Math.round(output[0]) ? 'Face two' : 'Face one'} ${output[0]}`);
}
