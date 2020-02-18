import React from "react";
import Game from "./Game";

import "./Game.css";

class GameContainer extends React.Component {
  state = {
    currentGameMode: "",
    userName: "",
    gameSettings: {},
    isStarted: false,
    isCompTurn: false,
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

  startGame = () => {
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
  };

  render() {
    const { currentGameMode, userName, gameSettings, isStarted } = this.state;
    return (
      <Game
        onInputChange={this.onInputChange}
        currentGameMode={currentGameMode}
        getSettings={this.getSettings}
        gameSettings={gameSettings}
        userName={userName}
        startGame={this.startGame}
        isStarted={isStarted}
      />
    );
  }
}

export default GameContainer;
