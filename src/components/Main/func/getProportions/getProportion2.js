export const getProportion2 = ({ leftEar, leftEye, nose, mouth }) => {
  // proportion2 - left ear - mouth to left eye - nose
  const outerDistance = Math.sqrt(
    Math.pow((leftEar[0] - mouth[0]), 2) + Math.pow((leftEar[1] - mouth[1]), 2)
  );
  const innerDistance = Math.sqrt(
    Math.pow((leftEye[0] - nose[0]), 2) + Math.pow((leftEye[1] - nose[1]), 2)
  );

  const proportion2 = innerDistance / outerDistance;

  return proportion2;
}
