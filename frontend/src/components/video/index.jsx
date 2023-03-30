import React, { useRef } from "react";
import videoFile from "../../assets/TIMELAPSE_SUNSET_1.mp4";

function VideoBackground() {
  const videoRef = useRef(null);
  const [playForward, setPlayForward] = React.useState(true);

  const handleVideoEnded = () => {
    setPlayForward(!playForward);
  };

  React.useEffect(() => {
    if (playForward) {
      videoRef.current.playbackRate = 1;
      videoRef.current.play();
    } else {
      videoRef.current.playbackRate = -1;
      videoRef.current.play();
    }
  }, [playForward]);

  return (
    <video
      id="background-video"
      style={{
        position: "fixed",
        top: 0,
        left:0, 
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -1
      }}
      autoPlay
      loop
      muted
      onEnded={handleVideoEnded}
      ref={videoRef}
    >
      <source src={videoFile} type="video/mp4" />
    </video>
  );
}

export default VideoBackground;
