import React from "react";

const Leaderboard = props => {
  const { renderList } = props;
  return (
    <div className="Leaderboard">
      <h1 className="Leaderboard-heading">Leader Board</h1>
      <ul className="Leaderboard-list">{renderList()}</ul>
    </div>
  );
};

export default Leaderboard;
