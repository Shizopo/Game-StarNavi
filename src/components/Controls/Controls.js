import React from "react";

const Controls = props => {
  const {
    renderGameModes,
    onInputChange,
    currentGameMode,
    userName,
    startGame,
  } = props;
  return (
    <div className="Controls">
      <select
        name="currentGameMode"
        onChange={onInputChange}
        value={currentGameMode}
        className="Controls-input Controls-input_gameMode"
      >
        <option value="" disabled hidden>
          Pick game mode
        </option>
        {renderGameModes()}
      </select>
      <input
        name="userName"
        type="text"
        className="Controls-input Controls-input_nameInput"
        onChange={e => onInputChange(e)}
        value={userName}
      />
      <button
        className="Controls-input Controls-input_playButton"
        name="playButton"
        type="button"
        disabled={!currentGameMode ? true : false}
        onClick={() => startGame(true)}
      >
        Play
      </button>
    </div>
  );
};

export default Controls;
