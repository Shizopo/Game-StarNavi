import React from "react";
import Game from "./Game";

import "./Game.css";

class GameContainer extends React.Component {
  state = {
    currentGameMode: "",
    userName: "",
  };

  onInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value, this.state);
    this.setState({ [name]: value });
  };

  render() {
    const { currentGameMode, userName } = this.state;
    return (
      <Game
        onInputChange={this.onInputChange}
        currentGameMode={currentGameMode}
        userName={userName}
      />
    );
  }
}

export default GameContainer;
