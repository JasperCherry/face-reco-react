export const getCtx = ({ canvas }) => {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';

  return ctx;
}
