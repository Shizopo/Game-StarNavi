import React from "react";
import Controls from "../Controls";
import Board from "../Board";

const Game = props => {
  const { onInputChange, currentGameMode, userName } = props;
  return (
    <div className="Game">
      <Controls
        onInputChange={onInputChange}
        currentGameMode={currentGameMode}
        userName={userName}
      />
      <Board />
    </div>
  );
};

export default Game;
