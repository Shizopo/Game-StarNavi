import React from "react";

const Cell = props => {
  const { id, isHighlighted, handleClick } = props;
  let className = isHighlighted
    ? "Board-row-cell_highlighted"
    : "Board-row-cell";

  return (
    <div
      className={className}
      key={id}
      id={id}
      onClick={e => handleClick(e)}
    ></div>
  );
};

export default Cell;
