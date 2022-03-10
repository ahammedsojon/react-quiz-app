import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../styles/MiniPlayer.module.css";

const MiniPlayer = ({ id, title }) => {
  const [status, setStatus] = useState(false);
  const btnRef = useRef();
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  const toggleMiniPlayer = () => {
    if (status) {
      setStatus(false);
      btnRef.current.classList.add(classes.floatingBtn);
    } else {
      setStatus(true);
      btnRef.current.classList.remove(classes.floatingBtn);
    }
  };

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={btnRef}
      onClick={toggleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={toggleMiniPlayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        className={classes.player}
        url={videoUrl}
        width="300px"
        height="168px"
        playing={status}
        controls
      />
      <p>{title}</p>
    </div>
  );
};

export default MiniPlayer;
