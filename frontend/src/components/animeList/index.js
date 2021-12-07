import "./index.css";
import Image from "../Image";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const AnimeList = () => {
  const [items, setShows] = useState([]);
  const firstUpdate = useRef(false);

  useEffect(() => {
    console.log("ready");
    // if (firstUpdate.current) {
    //   firstUpdate.current = false;
    //   return;
    // }
    fetch("/all_shows")
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
      });
  }, []);

  const calculatedScroll = (episodesLength) => {
    if (window.innerWidth <= 320) {
      return (window.innerWidth / 3) * episodesLength + "px";
    }
    if (window.innerWidth >= 1024) {
      return (window.innerWidth / 3) * episodesLength + "px";
    } else {
      return (window.innerWidth / 7) * episodesLength + "px";
    }
  };
  const listItems = items.map((item, index) => {
    const mainItem = item[index];
    return (
      <li key={index} data-handle={mainItem.handle}>
        <Link to={"/shows/" + mainItem.handle}>
          <Image name={mainItem.poster} />
        </Link>
      </li>
    );
  });
  return (
    <ul
      className="featured-list"
      style={{ width: calculatedScroll(listItems.length) }}
    >
      {listItems}
    </ul>
  );
};

export default AnimeList;
