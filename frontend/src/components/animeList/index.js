import "./index.css";
import Image from "../Image";
import { Link } from "react-router-dom";

const AnimeList = ({ items }) => {
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
  const listItems = items.map((item, index) => (
    <li key={index} data-handle={item.handle}>
      <Link to={"/shows/" + item.handle}>
        <Image name={item.poster} />
      </Link>
    </li>
  ));
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
