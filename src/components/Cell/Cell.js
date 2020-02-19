import React from "react";

const Cell = props => {
  const { id, isHighlighted, handleClick, isHit, isMissed } = props;
  let className = () => {
    if (isHighlighted) {
      return "Board-row-cell_highlighted";
    } else if (isHit) {
      return "Board-row-cell_hit";
    } else if (isMissed) {
      return "Board-row-cell_missed";
    } else {
      return "Board-row-cell";
    }
  };

  return (
    <div
      className={className()}
      key={id}
      id={id}
      onClick={e => handleClick(e)}
    ></div>
  );
};

export default Cell;
