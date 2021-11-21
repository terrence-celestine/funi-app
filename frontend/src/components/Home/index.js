import HomeSlider from "../homeslider";
import AnimeList from "../animeList";
import WatchList from "../watchList";

import { useState, useEffect } from "react";
import "./index.css";

const Home = ({ user }) => {
  const [shows, setShows] = useState([]);
  const [queue, setQueue] = useState({});

  useEffect(() => {
    fetch("/all_shows")
      .then((response) => response.json())
      .then((data) => setShows(() => [...data.videos]));
    if (user) {
      const episode_progress = localStorage.getItem("episode_progress");
      if (episode_progress) {
        const lastSeenShows = JSON.parse(episode_progress);
        setQueue(lastSeenShows);
      }
    }
  }, []);

  return (
    <>
      <HomeSlider activeUser={user} />
      <div className="show-category-container">
        {user ? <WatchList shows={queue} /> : ""}
      </div>
      <div className="show-category-container">
        <h2>Fall 2021 Season</h2>
        {shows.length > 0 ? <AnimeList items={shows} /> : ""}
      </div>
    </>
  );
};

export default Home;
