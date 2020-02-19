import React from "react";
import Cell from "./Cell";

class CellContainer extends React.PureComponent {
  state = {
    // isClicked: false,
    isMissed: false,
    isHit: false,
  };

  render() {
    const {
      row,
      column,
      isHighlighted,
      isHit,
      isMissed,
    } = this.props.fieldcell;

    const { handleClick } = this.props;

    let id = row + column;

    return (
      <Cell
        id={id}
        isHighlighted={isHighlighted}
        handleClick={handleClick}
        isHit={isHit}
        isMissed={isMissed}
      />
    );
  }
}

export default CellContainer;
