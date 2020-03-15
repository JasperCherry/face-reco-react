import React from 'react';
import {
  setupCamera,
} from './func';
import {
  VideoOutput,
} from './Video.styled';


class Video extends React.Component {
  componentDidMount = async () => {
    const video = await setupCamera();
    video.play();
  }


  render() {
    return (
      <div>
        <VideoOutput id="videoOutput" playsinline />
      </div>
    );
  }
}


export default Video;
