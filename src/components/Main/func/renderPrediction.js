import { recognizeCurrentPose } from './index';


export const renderPrediction = async ({ video, canvas, ctx, model, state, net, ref }) => {
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

      if (state.recordingPoseOne) {
        state.poseOneData.push(landmarks);
        if (state.poseOneData.length === 30) {
          state.recordingPoseOne = false;
          alert('Finished recording pose one');
        }
      }

      if (state.recordingPoseTwo) {
        state.poseTwoData.push(landmarks);
        if (state.poseTwoData.length === 30) {
          state.recordingPoseTwo = false;
          alert('Finished recording pose two');
        }
      }

      if (state.recordingTestData) {
        state.testData = landmarks;
        recognizeCurrentPose({ state, net });
      }
    }
  }

  if (!ref.state.canTrain) {
    if (state.poseOneData.length === 30 && state.poseTwoData.length === 30) {
      ref.setState({ canTrain: true });
    }
  }

  requestAnimationFrame(() => renderPrediction({ video, canvas, ctx, model, state, net, ref }));
};
