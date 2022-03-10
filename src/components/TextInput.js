import React from "react";
import classes from "../styles/TextInput.module.css";

const TextInput = ({ children, ...rest }) => {
  // console.log(...rest);
  return (
    <div className={classes.textInput}>
      <input {...rest} />
      <span className="material-icons-outlined">{children}</span>
    </div>
  );
};

export default TextInput;
