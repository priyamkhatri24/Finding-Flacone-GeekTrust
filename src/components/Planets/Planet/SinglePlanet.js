import React from "react";
import classes from "./SinglePlanet.module.css";

const singlePlanet = (props) => {
  const classList = [classes.image];
  if (props.activePlanet) {
    classList.push(classes.active);
  }
  return (
    <div>
      <img
        onClick={props.clicked}
        className={classList.join(" ")}
        src={props.src}
        name={props.name}
      ></img>
      <p className={classes.planetDescription}>{props.name}</p>
      <p className={classes.planetDescription}>{props.distance} Space Units</p>
      {props.spaceshipAssigned ? (
        <p className={classes.spaceshipAssigned}>
          {props.spaceshipAssigned}
          <span
            name={props.name}
            onClick={props.removeClicked}
            className={classes.removeSymbol}
          >
            X
          </span>
        </p>
      ) : null}
    </div>
  );
};

export default singlePlanet;
