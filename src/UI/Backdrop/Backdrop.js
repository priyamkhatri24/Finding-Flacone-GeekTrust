import classes from "./Backdrop.module.css";
import React from "react";

const backdrop = (props) => {
  return <div onClick={props.clicked} className={classes.backdrop}></div>;
};

export default backdrop;
