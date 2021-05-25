import React, { Component } from "react";
import classes from "./App.module.css";
import Background from "./components/Background/Background";
import Planets from "./components/Planets/Planets";
import spaceshipBox from "./components/SpaceshipsBox/SpaceshipsBox";
import SpaceshipBox from "./components/SpaceshipsBox/SpaceshipsBox";
import Result from "./Result/Result";
import Button from "./UI/Button/Button";
import Modal from "./UI/Modal/Modal";
import Spinner from "./UI/Spinner/Spinner";

class App extends Component {
  state = {
    planets: [],
    spaceships: [],
    activePlanet: null,
    mapping: {},
    showModal: false,
    displayResult: false,
    resultMessage: null,
    result: "",
    timeTaken: null,
  };
  componentDidMount() {
    fetch("https://findfalcone.herokuapp.com/planets")
      .then((data) => data.json())
      .then((res) => this.setState({ planets: res }))
      .catch((err) => alert("Something went wrong. Please reload the page"));
    fetch("https://findfalcone.herokuapp.com/vehicles")
      .then((data) => data.json())
      .then((res) => this.setState({ spaceships: res }))
      .catch((err) => alert("Something went wrong. Please reload the page"));
  }
  activePlanetSelector = (e) => {
    this.setState({ activePlanet: e.target.name });
  };

  success = (randomPlanet) => {
    const planets = [...this.state.planets];
    const spaceships = [...this.state.spaceships];
    const mapping = { ...this.state.mapping };
    const reachedSpaceship = mapping[randomPlanet];

    const reachedSpaceshipObect = spaceships.find(
      (ele) => ele.name === reachedSpaceship
    );
    const randomPlanetObject = planets.find((ele) => ele.name === randomPlanet);
    const timeTaken =
      randomPlanetObject.distance /
      (reachedSpaceshipObect.speed * reachedSpaceshipObect.total_no);
    this.setState({
      resultMessage: `Congratulations! Falcone was found in ${randomPlanet}`,
      result: "success",
      timeTaken: timeTaken,
    });
  };
  failure = () => {
    this.setState({
      resultMessage: `Ooops! Falcone was not found!`,
      result: "fail",
    });
  };
  spaceshipsDeployHandler = () => {
    const mappedPlanets = Object.keys(this.state.mapping);
    if (mappedPlanets.length < 4) return;

    // PROBLEM GETTING THE TOKEN (404) - Alternate solution
    const randomIndex = Math.floor(Math.random() * 6);
    const planets = [...this.state.planets];
    const randomPlanet = planets[randomIndex];

    this.setState({ showModal: true });
    setTimeout(() => {
      if (mappedPlanets.includes(randomPlanet.name)) {
        this.success(randomPlanet.name);
      } else {
        this.failure();
      }
      this.setState({ displayResult: true });
    }, 2000);
  };
  mappingHandler = (e) => {
    const mapping = { ...this.state.mapping };
    const selectedSpaceship = e.target.getAttribute("name");
    const planets = [...this.state.planets];
    const spaceships = [...this.state.spaceships];
    const activePlanet = this.state.activePlanet;

    const activePlanetObject = planets.find((ele) => ele.name === activePlanet);
    const selectedSpaceshipObect = spaceships.find(
      (ele) => ele.name === selectedSpaceship
    );
    if (activePlanetObject.distance > selectedSpaceshipObect.max_distance) {
      alert(
        "You cannot select a spaceship whose maximum distance is less than planet's distance."
      );
      return;
    }

    mapping[activePlanet] = selectedSpaceship;
    this.setState({ mapping: mapping });
  };
  removeAssignedSpaceshipHandler = (e) => {
    const mapping = { ...this.state.mapping };
    delete mapping[e.target.getAttribute("name")];
    this.setState({ mapping: mapping });
  };
  cancelModalHandler = () => {
    this.setState({
      activePlanet: null,
      mapping: {},
      showModal: false,
      displayResult: false,
      resultMessage: null,
      result: "",
    });
  };

  render() {
    let spaceshipBox = <h3>Click on a planet to begin</h3>;
    if (this.state.activePlanet)
      spaceshipBox = (
        <SpaceshipBox
          clicked={this.mappingHandler}
          spaceships={this.state.spaceships}
          activePlanet={this.state.activePlanet}
          mapping={this.state.mapping}
        />
      );
    let planets = <Spinner color="white" />;
    if (this.state.planets.length) {
      planets = (
        <Planets
          removeClicked={this.removeAssignedSpaceshipHandler}
          mapping={this.state.mapping}
          activePlanet={this.state.activePlanet}
          planets={this.state.planets}
          clicked={this.activePlanetSelector}
        />
      );
    }
    let modalContent = <Spinner color="orangered" />;
    if (this.state.displayResult) {
      modalContent = (
        <Result
          timeTaken={this.state.timeTaken}
          message={this.state.resultMessage}
          result={this.state.result}
        />
      );
    }
    return (
      <div className={classes.app}>
        <Modal
          cancelModal={this.cancelModalHandler}
          show={this.state.showModal}
        >
          {modalContent}
        </Modal>
        <Background>
          {planets}
          <Button clicked={this.spaceshipsDeployHandler} textContent="Deploy" />
        </Background>
        {spaceshipBox}
      </div>
    );
  }
}

export default App;
