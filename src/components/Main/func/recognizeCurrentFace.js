import { getProportions } from './index';


export const recognizeCurrentFace = ({ state, net }) => {
  const { testData } = state;
  const proportions = getProportions(testData);
  const output = net.run(proportions);
  console.log(`${output[0]} // if closer to 0 then face one, closer to 1 then face two // recognized face: ${Math.round(output[0]) ? 'face two' : 'face one'}`);
}
