import React, { useMemo } from "react";
import successImage from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";
import classes from "../styles/Summary.module.css";
const Summary = ({ score, noq }) => {
  const getKeyword = useMemo(() => {
    if ((score / (noq * 5)) * 100 < 25) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 50) {
      return "avearage";
    } else if ((score / (noq * 5)) * 100 < 75) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  }, [score, noq]);

  const { loading, error, result } = useFetch(
    `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`,
    "GET",
    { Authorization: process.env.REACT_APP_PEXELS_API_KEY }
  );

  const { photos } = result;
  const image =
    photos && photos.length > 0 ? photos[0].src.medium : successImage;
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* progress bar will be placed here */}
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
};

export default Summary;
