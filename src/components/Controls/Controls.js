import React from "react";

const Controls = props => {
  const { renderGameModes, onInputChange, currentGameMode, userName } = props;
  console.log(renderGameModes, onInputChange, currentGameMode);
  return (
    <div className="Controls">
      <select
        name="currentGameMode"
        onChange={onInputChange}
        value={currentGameMode}
        className="Controls-input Controls-input_gameMode"
      >
        {renderGameModes()}
      </select>
      <input
        name="userName"
        type="text"
        className="Controls-input Controls-input_nameInput"
        onChange={e => onInputChange(e)}
        value={userName}
      />
      <button className="Controls-input Controls-input_playButton">Play</button>
    </div>
  );
};

export default Controls;
