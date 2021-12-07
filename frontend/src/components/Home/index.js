import HomeSlider from "../homeslider";
import AnimeList from "../animeList";
import WatchList from "../watchList";

import { useState, useEffect } from "react";
import "./index.css";

const Home = ({ user }) => {
  const [queue, setQueue] = useState({});

  useEffect(() => {
    if (user) {
      const episode_progress = localStorage.getItem("episode_progress");
      if (episode_progress) {
        const lastSeenShows = JSON.parse(episode_progress);
        setQueue(lastSeenShows);
      }
    }
  }, [user]);

  return (
    <>
      <HomeSlider activeUser={user} />
      <div className="show-category-container">
        {user ? <WatchList shows={queue} /> : ""}
      </div>
      <div className="show-category-container">
        <h2>Fall 2021 Season</h2>
        <AnimeList />
      </div>
    </>
  );
};

export default Home;
