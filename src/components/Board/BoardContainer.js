import React from "react";
import Board from "./Board";
import Cell from "../Cell/";
import postService from "../../utils/dataPostService";

import "./Board.css";

class BoardContainer extends React.PureComponent {
  state = {
    fieldArr: [],
    wasSelected: {},
    notSelectedIds: [],
    botScore: 0,
    userScore: 0,
    lastWinner: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isStarted !== this.props.isStarted) {
      this.generateBoard();
    }
    if (prevProps.isEnded !== this.props.isEnded && !this.props.isEnded) {
      this.startNewGame();
    }
    if (
      prevState.lastWinner !== this.state.lastWinner &&
      this.state.lastWinner.length > 0
    ) {
      this.sendWinnerData(this.state.lastWinner);
    }
  }

  startNewGame = () => {
    this.setState({
      wasSelected: {},
      botScore: 0,
      userScore: 0,
      lastWinner: "",
    });
    return true;
  };

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

    this.setState(
      {
        fieldArr,
        notSelectedIds,
      },
      () => {
        this.makeTurn();
      }
    );

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
        this.checkGameStatus();
      }
    );
  };

  checkGameStatus = () => {
    let { onGameStatusGhange, isStarted, isEnded } = this.props;
    const { botScore, userScore } = this.state;
    const fieldLength =
      this.props.gameSettings.field * this.props.gameSettings.field;

    if (botScore >= fieldLength / 2 || userScore >= fieldLength / 2) {
      isEnded = true;
      isStarted = false;
      onGameStatusGhange({ isStarted, isEnded });
    }
    this.makeTurn();
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
    let winner;
    if (isEnded) {
      winner = this.checkWinner(userName);
      return `${winner} wins`;
    }
    return `${userName}: ${userScore} / Bot: ${botScore}`;
  };

  checkWinner = userName => {
    const winner =
      this.state.userScore > this.state.botScore ? userName : "Bot";
    this.setState({ lastWinner: winner });
    return winner;
  };

  sendWinnerData = async winner => {
    const { updateLeaderboard } = this.props;
    const date = new Date();
    const parsedDate = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
    const requestBody = { winner: winner, date: parsedDate };
    const request = {
      endpoint: "winners",
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const leaderboard = await postService(request);
    updateLeaderboard();
    return leaderboard;
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
