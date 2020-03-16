export const getProportion1 = ({ leftEar, rightEar, leftEye, rightEye }) => {
  // proportion1 - ears to eyes
  const outerDistance = Math.sqrt(
    Math.pow((leftEar[0] - rightEar[0]), 2) + Math.pow((leftEar[1] - rightEar[1]), 2)
  );
  const innerDistance = Math.sqrt(
    Math.pow((leftEye[0] - rightEye[0]), 2) + Math.pow((leftEye[1] - rightEye[1]), 2)
  );

  const proportion1 = innerDistance / outerDistance;

  return proportion1;
}
