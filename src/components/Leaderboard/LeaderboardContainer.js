import React from "react";
import Leaderboard from "./Leaderboard";
import fetchService from "../../utils/dataFetchService";

import "./Leaderboard.css";

class LeaderboardContainer extends React.PureComponent {
  state = {
    leaderboard: [],
    isLoading: true,
  };

  async componentDidMount() {
    const endpoint = "winners";
    const leaderboard = await fetchService(endpoint);
    this.setState({ leaderboard, isLoading: false });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isWinnerPosted !== this.props.isWinnerPosted) {
      const endpoint = "winners";
      const leaderboard = await fetchService(endpoint);
      this.setState({ leaderboard, isLoading: false });
    }
  }

  renderList = () => {
    const { leaderboard } = this.state;
    const lastFourItems = leaderboard.slice(-4);
    return lastFourItems.map(el => {
      const date = new Date(el.date);
      const parsedDate = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
      return (
        <li className="Leaderboard-list-item" key={el.id}>
          <p>{el.winner}</p>
          <p>{parsedDate}</p>
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
