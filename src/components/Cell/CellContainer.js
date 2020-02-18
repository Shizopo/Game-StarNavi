import React from "react";
import Cell from "./Cell";

class CellContainer extends React.PureComponent {
  state = {
    isClicked: false,
    isMissed: false,
    isHit: false,
  };

  handleClick = e => {
    e.preventDefault();
    const { id } = e.target;
    const { isClicked, isHighlighted, isMissed, isHit } = this.state;
    this.setState({ isClicked: !isClicked });
    console.log("click handler", id);
    if (isClicked === isHighlighted) {
      this.setState({ isHit: !isHit }, () => console.log("good shot"));
    } else if (isClicked !== isHighlighted) {
      this.setState({ isMissed: !isMissed }, () => console.log("miss"));
    }
    this.setState({ clickedElement: e.target.id, isClicked: true }, () =>
      console.log(this.state)
    );
  };

  render() {
    const { id, isHighlighted } = this.props;
    const { isClicked, isMissed, isHit } = this.state;

    return (
      <Cell
        id={id}
        isHighlighted={isHighlighted}
        isClicked={isClicked}
        isMissed={isMissed}
        isHit={isHit}
        handleClick={this.handleClick}
      />
    );
  }
}

export default CellContainer;
