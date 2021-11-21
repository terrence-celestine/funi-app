import HomeSlider from "../homeslider";
import AnimeList from "../anime-list";
import { useState, useEffect } from "react";
import "./index.css";

const Home = ({ user }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("/all_shows")
      .then((response) => response.json())
      .then((data) => setShows((shows) => [...data.videos]));
  }, []);

  return (
    <>
      <HomeSlider activeUser={user} />
      <div className="show-category-container">
        <h2>Fall 2021 Season</h2>
        {shows.length > 0 ? <AnimeList items={shows} /> : ""}
      </div>
    </>
  );
};

export default Home;
