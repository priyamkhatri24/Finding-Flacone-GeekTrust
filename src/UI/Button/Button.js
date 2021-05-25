import classes from "./Button.module.css";
import React from "react";

const button = (props) => {
  return (
    <button className={classes.UIbutton} onClick={props.clicked}>
      {props.textContent}
    </button>
  );
};

export default button;
