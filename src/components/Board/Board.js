import React from "react";

const Board = props => {
  const { renderBoard, rowWidth } = props;
  return (
    <div className="BoardComponent">
      <p>Some Board text</p>
      <div className="Board" style={rowWidth}>
        {renderBoard()}
      </div>
    </div>
  );
};

export default Board;
