import React from "react";
import classes from "./Spinner.module.css";
const spinner = (props) => {
  return (
    <div style={{ color: props.color }} className={classes.loader}>
      Loading...
    </div>
  );
};
export default spinner;
