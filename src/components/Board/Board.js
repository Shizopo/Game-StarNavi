import React from "react";

const Board = props => {
  const { renderScore, renderBoard, rowWidth, isStarted, isEnded } = props;

  if (!isStarted && !isEnded) {
    return (
      <div className="BoardComponent">
        <div className="WelcomeScreen">The game is about to start</div>
      </div>
    );
  }
  return (
    <div className="BoardComponent">
      <div className="GameScore">{renderScore()}</div>
      {isStarted && !isEnded ? (
        <div className="Board" style={rowWidth}>
          {renderBoard()}
        </div>
      ) : null}
    </div>
  );
};

Board.whyDidYouRender = true;

export default Board;
