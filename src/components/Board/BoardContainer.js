import React from "react";
import Board from "./Board";
import Cell from "../Cell/";

import "./Board.css";

class BoardContainer extends React.Component {
  state = {
    fieldArr: [],
    wasSelected: {},
    notSelectedIds: [],
    botScore: 0,
    userScore: 0,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isStarted !== this.props.isStarted) {
      return this.props.isStarted ? this.generateBoard() : null;
    }
  }

  generateBoard = () => {
    if (this.props.isEnded) {
      return;
    }
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
    });

    return fieldArr;
  };

  renderBoard = () => {
    const { isEnded } = this.props;
    const { botScore, userScore } = this.state;
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

  checkCell = (row, column) => {
    const field = this.state.fieldArr;
    let { botScore, userScore } = this.state;
    if (field[row][column].isClicked === field[row][column].isHighlighted) {
      field[row][column].isMissed = false;
      field[row][column].isHit = true;
      field[row][column].isHighlighted = false;
      ++userScore;
    } else if (
      field[row][column].isHighlighted === true &&
      field[row][column].isClicked === false
    ) {
      field[row][column].isMissed = false;
      field[row][column].isHighlighted = false;
      field[row][column].isMissed = true;
      ++botScore;
    }

    this.setState(
      {
        fieldArr: field,
        botScore,
        userScore,
      },
      () => {
        this.makeTurn();
        this.checkGameStatus();
      }
    );
  };

  checkGameStatus = () => {
    let { onGameStatusGhange, isStarted, isEnded } = this.props;
    const { notSelectedIds, botScore, userScore } = this.state;
    const fieldLength =
      this.props.gameSettings.field * this.props.gameSettings.field;

    if (botScore >= fieldLength / 2 || userScore >= fieldLength / 2) {
      isEnded = true;
      isStarted = false;
      onGameStatusGhange({ isStarted, isEnded });
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
    if (this.props.isEnded) {
      return;
    }
    const { row, column } = this.generateRandomId();
    const { delay } = this.props.gameSettings;
    // const delay = 500;
    const field = this.state.fieldArr;
    field[row][column].isHighlighted = true;

    this.setState(
      {
        fieldArr: field,
      },

      () => {
        setTimeout(() => {
          this.checkCell(row, column);
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

  renderScore = () => {
    const userName = this.props.userName ? this.props.userName : "Player";
    const { isEnded } = this.props;
    const { botScore, userScore } = this.state;
    if (isEnded) {
      return `${userScore > botScore ? "User" : "Bot"} wins`;
    }
    return `${userName}: ${userScore} / Bot: ${botScore}`;
  };

  render() {
    const { isStarted, isEnded } = this.props;
    const { field } = this.props.gameSettings;
    const rowWidth = this.calculateRowWidth(field);

    return (
      <Board
        renderScore={this.renderScore}
        renderBoard={this.renderBoard}
        rowWidth={rowWidth}
        isStarted={isStarted}
        isEnded={isEnded}
      />
    );
  }
}

export default BoardContainer;
