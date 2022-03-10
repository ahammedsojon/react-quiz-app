import React from "react";
import { Link } from "react-router-dom";
import classes from "../styles/Video.module.css";
const Video = ({ video }) => {
  const { title, noq, youtubeID } = video;
  return (
    <>
      {noq === 0 ? (
        <div className={classes.video}>
          <img
            src={`http://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`}
            alt={title}
          />
          <p>{title}</p>
        </div>
      ) : (
        <Link to={{
          pathname: `/quiz/${youtubeID}`,
          state: {
            videoTitle: title
          }
        }}>
          <div className={classes.video}>
            <img
              src={`http://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`}
              alt={title}
            />
            <p>{title}</p>
            <div className={classes.qmeta}>
              <p>{noq} Questions</p>
              <p>Total points: {noq * 5}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Video;
