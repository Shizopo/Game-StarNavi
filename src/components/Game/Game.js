import React from "react";
import Controls from "../Controls";
import Board from "../Board";

const Game = props => {
  const { onInputChange, currentGameMode, userName, getSettings } = props;
  return (
    <div className="Game">
      <Controls
        onInputChange={onInputChange}
        currentGameMode={currentGameMode}
        getSettings={getSettings}
        userName={userName}
      />
      <Board currentGameMode={currentGameMode} />
    </div>
  );
};

export default Game;
