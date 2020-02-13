import React from "react";
import Controls from "./Controls";
import fetchLeaderboard from "../../utils/dataFetchService";

import "./Controls.css";

class ControlsContainer extends React.Component {
  state = {
    gameModes: {},
    isLoading: true,
  };

  async componentDidMount() {
    const endpoint = "game-settings";
    const gameModes = await fetchLeaderboard(endpoint);
    this.setState({ gameModes, isLoading: false }, () =>
      console.log("settings", this.state)
    );
  }

  renderGameModes = () => {
    const { gameModes } = this.state;
    const gameModesArray = Object.keys(gameModes);
    console.log(gameModesArray);
    return gameModesArray.map((el, index) => (
      <option value={el} key={index}>
        {el}
      </option>
    ));
  };

  render() {
    const { isLoading } = this.state;
    const { onInputChange, currentGameMode, userName } = this.props;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <Controls
        renderGameModes={this.renderGameModes}
        onInputChange={onInputChange}
        currentGameMode={currentGameMode}
        userName={userName}
      />
    );
  }
}

export default ControlsContainer;
