import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Thumbnail from "../thumbnail";
import "./index.css";

const WatchList = ({ shows }) => {
  const navigate = useNavigate();
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetch("/queue", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: shows }),
    })
      .then((response) => response.json())
      .then((data) => setWatchList(data));
  }, [shows]);

  const openVideoPlayer = (showHandle, episodeID) => {
    navigate(`/v/${showHandle}/${episodeID}`, { replace: false });
  };

  return (
    <div>
      <h2>Continue Watching</h2>
      <ul className="watchlist">
        {watchList.map((item) => (
          <li
            className="episode"
            key={item.handle}
            onClick={() => openVideoPlayer(item.handle, item.id)}
          >
            <div className="progress-wrap">
              <Thumbnail show={item.handle} name={item.thumbnail} />
              <progress
                className="progress"
                value={item.progress}
                max="100"
              ></progress>
            </div>
            <span className="show-title">{item.handle.replace("_", " ")}</span>
            <span className="episode-title">
              {item.id} - {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
