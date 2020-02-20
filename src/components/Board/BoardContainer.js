import React from "react";
import Board from "./Board";
import Cell from "../Cell/";

import "./Board.css";

class BoardContainer extends React.PureComponent {
  state = {
    fieldArr: [],
    wasSelected: {},
    notSelectedIds: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isStarted !== this.props.isStarted) {
      return this.props.isStarted ? this.generateBoard() : null;
    }
  }

  generateBoard = () => {
    const { field } = this.props.gameSettings;
    const fieldArr = [];
    const notSelectedIds = [];

    for (let i = 0; i < field; i++) {
      fieldArr.push([]);
      for (let j = 0; j < field; j++) {
        fieldArr[i][j] = {
          row: i,
          column: j,
          isClicked: false,
          isHighlighted: false,
          isMissed: false,
          isHit: false,
        };
        notSelectedIds.push({ row: i, column: j });
      }
    }

    this.setState({ fieldArr, notSelectedIds }, () => {
      this.makeTurn();
      this.renderBoard();
    });

    this.renderBoard();

    return fieldArr;
  };

  renderBoard = () => {
    const field = this.state.fieldArr;

    return field.map(fieldrow => {
      return fieldrow.map(fieldcell => {
        const { row, column } = fieldcell;
        return (
          <div key={row + column}>
            <Cell
              handleClick={() => {
                this.handleClick(row, column);
              }}
              fieldcell={fieldcell}
            />
          </div>
        );
      });
    });
  };

  checkShot = (row, column) => {
    const field = this.state.fieldArr;
    if (field[row][column].isClicked === field[row][column].isHighlighted) {
      field[row][column].isMissed = false;
      field[row][column].isHit = true;
      field[row][column].isHighlighted = false;
    } else if (
      field[row][column].isHighlighted === true &&
      field[row][column].isClicked === false
    ) {
      field[row][column].isMissed = false;
      field[row][column].isHighlighted = false;
      field[row][column].isMissed = true;
    }

    this.setState(
      {
        fieldArr: field,
      },
      () => {
        this.checkGameStatus();
        this.makeTurn();
      }
    );
  };

  checkGameStatus = () => {
    const { startGame } = this.props;
    const { notSelectedIds } = this.state;
    const fieldLength =
      this.props.gameSettings.field * this.props.gameSettings.field;
    if (notSelectedIds.length < fieldLength / 2) {
      startGame(false);
    }
  };

  handleClick = (row, column) => {
    const field = this.state.fieldArr;
    field[row][column].isClicked = true;

    this.setState({
      fieldArr: field,
    });
  };

  makeTurn = () => {
    const { row, column } = this.generateRandomId();
    const { delay } = this.props.gameSettings;
    const field = this.state.fieldArr;
    field[row][column].isHighlighted = true;

    this.setState(
      {
        fieldArr: field,
      },
      () => {
        setTimeout(() => {
          this.checkShot(row, column);
        }, delay);
      }
    );
  };

  calculateRowWidth = field => {
    const rowWidth = 2 * field + 2;
    return { width: rowWidth + "em" };
  };

  generateRandomId = () => {
    const notSelectedIds = this.state.notSelectedIds;
    const randomNumber =
      Math.floor(Math.random() * (notSelectedIds.length - 0)) + 0;
    const randomId = notSelectedIds.splice(randomNumber, 1);
    const { row, column } = randomId[0];

    this.setState({
      wasSelected: { row, column },
    });
    return { row, column };
  };

  render() {
    const { isStarted } = this.props;
    const { field } = this.props.gameSettings;
    const rowWidth = this.calculateRowWidth(field);

    if (!isStarted) {
      return <div className="WelcomeScreen">The game is about to start</div>;
    }
    return <Board renderBoard={this.renderBoard} rowWidth={rowWidth} />;
  }
}

export default BoardContainer;
