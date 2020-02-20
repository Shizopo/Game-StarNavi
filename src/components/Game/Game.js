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
    onGameStatusGhange,
    isStarted,
    isEnded,
  } = props;

  return (
    <div className="Game">
      <Controls
        onInputChange={onInputChange}
        currentGameMode={currentGameMode}
        getSettings={getSettings}
        userName={userName}
        onGameStatusGhange={onGameStatusGhange}
        isStarted={isStarted}
        isEnded={isEnded}
      />
      <Board
        gameSettings={gameSettings}
        userName={userName}
        onGameStatusGhange={onGameStatusGhange}
        isStarted={isStarted}
        isEnded={isEnded}
      />
    </div>
  );
};

export default Game;
