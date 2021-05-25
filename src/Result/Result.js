import classes from "./Result.module.css";
import React from "react";

const result = (props) => {
  const resultClass = {
    color: `${props.result === "success" ? "green" : "red"}`,
  };
  return (
    <div className={classes.result}>
      <h1 style={resultClass}>{props.result.toUpperCase()}</h1>
      <h4>{props.message}</h4>
      {props.timeTaken ? (
        <h4>Total Time Taken: {props.timeTaken} Units</h4>
      ) : null}
    </div>
  );
};

export default result;
