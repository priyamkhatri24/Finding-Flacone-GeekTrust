import React from "react";
import SinglePlanet from "./Planet/SinglePlanet";
import img1 from "../../assets/planet1.png";
import img2 from "../../assets/planet2.png";
import img3 from "../../assets/planet3.png";
import img4 from "../../assets/planet4.png";
import img5 from "../../assets/planet5.png";
import img6 from "../../assets/planet6.png";
import classes from "./Planets.module.css";

const planets = (props) => {
  // prettier-ignore
  const images = { img1,img2,img3,img4,img5,img6 }
  const planets = [...props.planets];
  const mapping = { ...props.mapping };
  const singlePlanet = planets.map((ele, index) => {
    return (
      <SinglePlanet
        removeClicked={props.removeClicked}
        name={ele.name}
        spaceshipAssigned={mapping[ele.name]}
        activePlanet={props.activePlanet === ele.name}
        distance={ele.distance}
        clicked={props.clicked}
        key={index}
        src={images[`img${index + 1}`]}
      />
    );
  });

  return <div className={classes.planetContainer}>{singlePlanet}</div>;
};

export default planets;
