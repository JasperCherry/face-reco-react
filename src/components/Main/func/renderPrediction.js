import { recognizeCurrentFace } from './index';


export const renderPrediction = async ({ video, canvas, ctx, model, state, net }) => {
  const returnTensors = false;
  const flipHorizontal = true;
  const annotateBoxes = true;

  const predictions = await model.estimateFaces(video, returnTensors, flipHorizontal, annotateBoxes);

  if (predictions.length > 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < predictions.length; i++) {
      const { landmarks } = predictions[i];

      if (annotateBoxes) {
        for (let j = 0; j < landmarks.length; j++) {
          if (j === 0) {
            ctx.fillStyle = "red";
          } else if (j === 1) {
            ctx.fillStyle = "blue";
          } else if (j === 2) {
            ctx.fillStyle = "orange";
          } else if (j === 3) {
            ctx.fillStyle = "pink";
          } else if (j === 4) {
            ctx.fillStyle = "yellow";
          } else if (j === 5) {
            ctx.fillStyle = "white";
          }

          const x = landmarks[j][0];
          const y = landmarks[j][1];
          ctx.fillRect(x, y, 5, 5);
        }
      }

      if (state.recordingFaceOne) {
        state.faceOneData.push(landmarks);
      }

      if (state.recordingFaceTwo) {
        state.faceTwoData.push(landmarks);
      }

      if (state.recordingTestData) {
        state.recordingTestData = false;
        state.testData = landmarks;
        recognizeCurrentFace({ state, net });
      }
    }
  }

  requestAnimationFrame(() => renderPrediction({ video, canvas, ctx, model, state, net }));
};
