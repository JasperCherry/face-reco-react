import { recognizeCurrentFace } from './index';


export const renderPrediction = async ({ video, canvas, ctx, model, state, net }) => {
  const returnTensors = false;
  const flipHorizontal = true;
  const annotateBoxes = true;

  const predictions = await model.estimateFaces(video, returnTensors, flipHorizontal, annotateBoxes);

  if (predictions.length > 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < predictions.length; i++) {
      if (annotateBoxes) {
        const landmarks = predictions[i].landmarks;
        const landmarksNamed = {};

        for (let j = 0; j < landmarks.length; j++) {
          if (j === 0) {
            landmarksNamed.rightEye = landmarks[j];
            ctx.fillStyle = "red";
          } else if (j === 1) {
            landmarksNamed.leftEye = landmarks[j];
            ctx.fillStyle = "blue";
          } else if (j === 2) {
            landmarksNamed.nose = landmarks[j];
            ctx.fillStyle = "orange";
          } else if (j === 3) {
            landmarksNamed.mouth = landmarks[j];
            ctx.fillStyle = "pink";
          } else if (j === 4) {
            landmarksNamed.rightEar = landmarks[j];
            ctx.fillStyle = "yellow";
          } else if (j === 5) {
            landmarksNamed.leftEar = landmarks[j];
            ctx.fillStyle = "white";
          }

          const x = landmarks[j][0];
          const y = landmarks[j][1];
          ctx.fillRect(x, y, 5, 5);

          predictions[i].landmarksNamed = landmarksNamed;
        }
      }

      if (state.recordingFaceOne) {
        state.faceOneData.push(predictions[i].landmarksNamed);
      }

      if (state.recordingFaceTwo) {
        state.faceTwoData.push(predictions[i].landmarksNamed);
      }

      if (state.recordingTestData) {
        state.recordingTestData = false;
        state.testData = predictions[i].landmarksNamed;
        recognizeCurrentFace({ state, net });
      }
    }
  }

  requestAnimationFrame(() => renderPrediction({ video, canvas, ctx, model, state, net }));
};
