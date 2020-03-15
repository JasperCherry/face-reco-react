export const renderPrediction = async ({ video, canvas, ctx, model }) => {
  const returnTensors = false;
  const flipHorizontal = true;
  const annotateBoxes = true;

  const predictions = await model.estimateFaces(video, returnTensors, flipHorizontal, annotateBoxes);

  if (predictions.length > 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < predictions.length; i++) {
      if (returnTensors) {
        predictions[i].topLeft = predictions[i].topLeft.arraySync();
        predictions[i].bottomRight = predictions[i].bottomRight.arraySync();
        if (annotateBoxes) {
          predictions[i].landmarks = predictions[i].landmarks.arraySync();
        }
      }

      if (annotateBoxes) {
        const landmarks = predictions[i].landmarks;

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
    }
  }

  requestAnimationFrame(() => renderPrediction({ video, canvas, ctx, model }));
};