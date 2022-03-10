import React from "react";
import classes from "../styles/Question.module.css";
import Answer from "./Answer";
const Question = ({ answers = [] }) => {
  return answers.map((answer, index) => (
    <div className={classes.question} key={index}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
      </div>
      <Answer input={false} options={answer.options} />
    </div>
  ));
};

export default Question;
