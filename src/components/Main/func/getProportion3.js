export const getProportion3 = ({ rightEar, rightEye, nose, mouth }) => {
  // proportion3 - right ear - mouth to right eye - nose
  const outerDistance = Math.sqrt(
    Math.pow((rightEar[0] - mouth[0]), 2) + Math.pow((rightEar[1] - mouth[1]), 2)
  );
  const innerDistance = Math.sqrt(
    Math.pow((rightEye[0] - nose[0]), 2) + Math.pow((rightEye[1] - nose[1]), 2)
  );

  const proportion3 = innerDistance / outerDistance;

  return proportion3;
}
