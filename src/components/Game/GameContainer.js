import React from "react";
import Game from "./Game";

import "./Game.css";

class GameContainer extends React.Component {
  state = {
    currentGameMode: "",
    userName: "",
    gameSettings: {},
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

  render() {
    const { currentGameMode, userName } = this.state;
    return (
      <Game
        onInputChange={this.onInputChange}
        currentGameMode={currentGameMode}
        getSettings={this.getSettings}
        userName={userName}
      />
    );
  }
}

export default GameContainer;
