import React from "react";
import Leaderboard from "./Leaderboard";
import fetchLeaderboard from "../../utils/dataFetchService";

import "./Leaderboard.css";

class LeaderboardContainer extends React.Component {
  state = {
    leaderboard: [],
    isLoading: true,
  };

  async componentDidMount() {
    const endpoint = "winners";
    console.log(this.state);
    const leaderboard = await fetchLeaderboard(endpoint);
    this.setState({ leaderboard, isLoading: false });
  }

  renderList = () => {
    const { leaderboard } = this.state;
    const lastFourItems = leaderboard.slice(-4);
    return lastFourItems.map(el => {
      return (
        <li className="Leaderboard-list-item" key={el.id}>
          <p>{el.winner}</p>
          <p>{el.date}</p>
        </li>
      );
    });
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Leaderboard renderList={this.renderList} />;
  }
}

export default LeaderboardContainer;
