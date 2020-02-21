import React from "react";

const Controls = props => {
  const {
    renderGameModes,
    onInputChange,
    currentGameMode,
    userName,
    onGameStatusGhange,
    isStarted,
    isEnded,
  } = props;
  return (
    <div className="Controls">
      <div className="Controls-selectWrapper">
        <select
          name="currentGameMode"
          onChange={onInputChange}
          value={currentGameMode}
          className="Controls-input Controls-input_gameMode"
          disabled={isStarted}
        >
          <option value="" disabled hidden>
            Pick game mode
          </option>
          {renderGameModes()}
        </select>
      </div>
      <input
        name="userName"
        type="text"
        className="Controls-input Controls-input_nameInput"
        onChange={e => onInputChange(e)}
        value={userName}
        placeholder="Player"
        disabled={isStarted}
      />
      {!isEnded ? (
        <button
          className="Controls-input Controls-input_playButton"
          name="playButton"
          type="button"
          disabled={isStarted || !currentGameMode}
          onClick={() =>
            onGameStatusGhange({
              isStarted: true,
              isEnded: false,
              isNewGame: false,
            })
          }
        >
          Play
        </button>
      ) : (
        <button
          className="Controls-input Controls-input_playButton"
          name="playButton"
          type="button"
          disabled={isStarted || !currentGameMode}
          onClick={() =>
            onGameStatusGhange({
              isStarted: true,
              isEnded: false,
              isNewGame: true,
            })
          }
        >
          Play again
        </button>
      )}
    </div>
  );
};

export default Controls;
