import React from "react";
import Leaderboard from "../Leaderboard/";
import Game from "../Game";

import "./App.css";

class App extends React.PureComponent {
  state = { isWinnerPosted: false };

  updateLeaderboard = () => {
    const { isWinnerPosted } = this.state;
    this.setState({ isWinnerPosted: !isWinnerPosted });
  };

  render() {
    const { isWinnerPosted } = this.state;
    return (
      <div className="App">
        <Game updateLeaderboard={this.updateLeaderboard} />
        <Leaderboard isWinnerPosted={isWinnerPosted} />
      </div>
    );
  }
}

export default App;
