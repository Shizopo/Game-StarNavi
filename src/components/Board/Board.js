import React from "react";

const Board = props => {
  const { renderBoard } = props;
  return (
    <div className="Board">
      <p>Some Board text</p>
      {renderBoard()}
    </div>
  );
};

export default Board;
