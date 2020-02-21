import React from "react";
import Controls from "./Controls";
import fetchService from "../../utils/dataFetchService";

import "./Controls.css";

class ControlsContainer extends React.Component {
  state = {
    gameModes: {},
    isLoading: true,
  };

  async componentDidMount() {
    const endpoint = "game-settings";
    const gameModes = await fetchService(endpoint);
    this.setState({ gameModes, isLoading: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentGameMode !== this.props.currentGameMode) {
      const { getSettings } = this.props;
      const { gameModes } = this.state;

      getSettings(gameModes);
    }
    return;
  }

  renderGameModes = () => {
    const { gameModes } = this.state;
    const gameModesArray = Object.keys(gameModes);
    return gameModesArray.map((el, index) => (
      <option value={el} key={index + 1}>
        {el}
      </option>
    ));
  };

  render() {
    const { isLoading } = this.state;
    const {
      onInputChange,
      currentGameMode,
      userName,
      onGameStatusGhange,
      isStarted,
      isEnded,
    } = this.props;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <Controls
        renderGameModes={this.renderGameModes}
        onInputChange={onInputChange}
        currentGameMode={currentGameMode}
        userName={userName}
        onGameStatusGhange={onGameStatusGhange}
        isStarted={isStarted}
        isEnded={isEnded}
      />
    );
  }
}

export default ControlsContainer;
