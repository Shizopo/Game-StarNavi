import React from "react";
import Game from "./Game";

import "./Game.css";

class GameContainer extends React.PureComponent {
  state = {
    currentGameMode: "",
    userName: "",
    gameSettings: {},
    isStarted: false,
    isEnded: false,
    isNewGame: false,
  };

  onInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
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
    let isNewGame = status.isNewGame ? status.isNewGame : false;
    if (isStarted && !isEnded) {
      this.setState({ isStarted: true, isEnded: false, isNewGame: true }, () =>
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
    } else if (isEnded && !isNewGame) {
      this.setState({ isStarted: false, isEnded: true });
    }
  };

  render() {
    const { updateLeaderboard } = this.props;
    const {
      currentGameMode,
      userName,
      gameSettings,
      isStarted,
      isEnded,
      isNewGame,
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
        isNew={isNewGame}
        updateLeaderboard={updateLeaderboard}
      />
    );
  }
}

export default GameContainer;
