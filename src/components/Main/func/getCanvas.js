export const getCanvas = ({ video }) => {
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;
  video.width = videoWidth;
  video.height = videoHeight;

  const canvas = document.getElementById('pointsOutput');
  canvas.width = videoWidth;
  canvas.height = videoHeight;

  return canvas;
}
