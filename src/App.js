import React, { Component } from "react";
import classes from "./App.module.css";
import Background from "./components/Background/Background";
import Planets from "./components/Planets/Planets";
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

    this.setState({
      resultMessage: `Congratulations! Falcone was found in ${randomPlanet}`,
      result: "success",
    });
  };
  failure = () => {
    this.setState({
      resultMessage: `Ooops! Falcone was not found!`,
      result: "fail",
    });
  };
  spaceshipsDeployHandler = () => {
    // PROBLEM GETTING THE TOKEN (404) - Alternate solution
    const mappedPlanets = Object.keys(this.state.mapping);

    if (mappedPlanets.length < 4) return;

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
      console.log(randomPlanet.name, mappedPlanets);
    }, 2000);
  };
  mappingHandler = (e) => {
    const mapping = { ...this.state.mapping };
    mapping[this.state.activePlanet] = e.target.getAttribute("name");
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
        <Result message={this.state.resultMessage} result={this.state.result} />
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
