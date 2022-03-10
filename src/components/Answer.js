import React from "react";
import classes from "../styles/Answer.module.css";
import Checkbox from "./Checkbox";
const Answer = ({ handleAnswerChange, options = [], input }) => {
  return (
    <div className={classes.answers}>
      {input ? (
        <>
          {options.map((option, index) => {
            return (
              <Checkbox
                key={index}
                text={option.title}
                className={classes.answer}
                value={index}
                onChange={(e) => handleAnswerChange(e, index)}
                checked={option.checked}
              />
            );
          })}
        </>
      ) : (
        <>
          {options.map((option, index) => {
            return (
              <Checkbox
                key={index}
                text={option.title}
                className={`${classes.answer} ${
                  option.correct
                    ? classes.correct
                    : option.checked
                    ? classes.wrong
                    : null
                }`}
                defaultChecked={option.checked}
                disabled
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default Answer;
