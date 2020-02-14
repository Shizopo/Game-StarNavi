import React from "react";
import Board from "./Board";

import "./Board.css";

class BoardContainer extends React.Component {
  state = {};

  renderBoard = () => {
    const { gameSettings } = this.props;
    const { field, delay } = gameSettings;
    // const rowArr = new Array(field);
    // const fieldArr = new Array(field);
    const fieldArr = [];
    for (let i = 0; i < field; i++) {
      const rowArr = [];
      for (let j = 0; j < field; j++) {
        console.log(i, j);
        const id = i.toString(10) + j.toString(10);
        console.log("id", id);
        const el = <div className="Board-row-cell" key={id} id={id}></div>;
        rowArr.push(el);
        console.log("rowArr", rowArr);
      }
      const arrangedRow = (
        <div className="Board-row" key={i} id={i}>
          {rowArr.map(el => el)}
        </div>
      );
      fieldArr.push(arrangedRow);
      console.log("fieldArr", fieldArr);
    }
    return fieldArr.map(el => el);
  };

  render() {
    const { isStarted } = this.props;
    if (!isStarted) {
      return <div className="WelcomeScreen">The game is about to start</div>;
    }
    return <Board renderBoard={this.renderBoard} />;
  }
}

export default BoardContainer;
