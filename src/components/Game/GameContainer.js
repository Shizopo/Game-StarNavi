import React from "react";
import Game from "./Game";

import "./Game.css";

class GameContainer extends React.Component {
  state = {
    currentGameMode: "",
    userName: "",
    gameSettings: {},
    isStarted: false,
    isEnded: false,
  };

  onInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value, this.state);
    this.setState({ [name]: value });
  };

  getSettings = modes => {
    const modeName = this.state.currentGameMode;
    if (modeName) {
      this.setState({ gameSettings: modes[modeName] });
    }
    return;
  };

  onGameStatusGhange = status => {
    const { isStarted, isEnded } = status;
    if (isStarted && !isEnded) {
      this.setState({ isStarted: true }, () =>
        console.log(
          "The game is just started with ",
          this.state.currentGameMode,
          ", that means field size of ",
          this.state.gameSettings.field,
          " and ",
          this.state.gameSettings.delay,
          " delay."
        )
      );
    } else if (isEnded) {
      this.setState({ isStarted: false, isEnded: true }, () =>
        console.log("Game over")
      );
    }
  };

  render() {
    const {
      currentGameMode,
      userName,
      gameSettings,
      isStarted,
      isEnded,
    } = this.state;
    return (
      <Game
        onInputChange={this.onInputChange}
        currentGameMode={currentGameMode}
        getSettings={this.getSettings}
        gameSettings={gameSettings}
        userName={userName}
        onGameStatusGhange={this.onGameStatusGhange}
        isStarted={isStarted}
        isEnded={isEnded}
      />
    );
  }
}

export default GameContainer;
