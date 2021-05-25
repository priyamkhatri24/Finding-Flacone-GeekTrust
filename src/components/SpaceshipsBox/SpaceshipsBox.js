import classes from "./SpaceshipBox.module.css";
import React from "react";

const spaceshipBox = (props) => {
  const spaceships = [...props.spaceships];
  let spaceshipClass = [classes.spaceshipName, classes.normalSpaceship];
  const mapping = { ...props.mapping };
  const mappingArray = Object.values(mapping);
  const filteredSpaceships = spaceships.filter((ele) => {
    return !mappingArray.includes(ele.name);
  });
  const selectors = filteredSpaceships.map((ele) => {
    return (
      <p
        name={ele.name}
        onClick={props.clicked}
        key={ele.name}
        className={spaceshipClass.join(" ")}
      >
        {ele.name} (Distance: {ele.max_distance}, Speed: {ele.speed})
      </p>
    );
  });
  return (
    <div className={classes.spaceshipSelectContainer}>
      <h3 className={classes.question}>
        Select the Spaceships you want to deploy to planet {props.activePlanet}?
      </h3>
      {selectors}
    </div>
  );
};

export default spaceshipBox;
