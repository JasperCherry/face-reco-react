import styled from 'styled-components';


export const VideoOutput = styled.video`
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  width: auto;
  height: auto;
`;


export const PointsOutput = styled.canvas`
  position: absolute;
  top: 10px;
  left: 10px;
`;
