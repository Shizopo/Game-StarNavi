import React from "react";
import Controls from "../Controls";
import Board from "../Board";

const Game = props => {
  const {
    onInputChange,
    currentGameMode,
    userName,
    getSettings,
    gameSettings,
    startGame,
    isStarted,
  } = props;

  return (
    <div className="Game">
      <Controls
        onInputChange={onInputChange}
        currentGameMode={currentGameMode}
        getSettings={getSettings}
        userName={userName}
        startGame={startGame}
      />
      <Board
        // currentGameMode={currentGameMode}
        gameSettings={gameSettings}
        userName={userName}
        isStarted={isStarted}
      />
    </div>
  );
};

export default Game;
