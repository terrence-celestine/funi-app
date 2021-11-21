import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "../Image";
import Thumbnail from "../thumbnail";
import { useNavigate } from "react-router-dom";

import "./index.css";

const ShowDetails = () => {
  const { showHandle } = useParams();
  const navigate = useNavigate();
  const launchVideoPlayer = (showHandle, episodeID) => {
    navigate(`/v/${showHandle}/${episodeID}`, { replace: false });
  };
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState([]);
  const BannerBG = (bannerName) => {
    const image = require(`../../assets/banners/${bannerName}`);
    if (image.default) {
      return image.default;
    } else {
      return "";
    }
  };
  const addToWatchList = (showHandle) => {
    console.log("updating user watch list");
  };
  useEffect(() => {
    fetch(`/shows/${showHandle}`)
      .then((response) => response.json())
      .then((data) => {
        setShowInfo(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  });
  return (
    <>
      {isLoading === false ? (
        <div className="showContainer">
          <div
            className="showBanner"
            style={{
              backgroundImage: `url(${BannerBG(showInfo.banner_image)})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="showMeta">
              <div className="show-poster">
                <Image name={showInfo.poster} />
              </div>
              <div className="show-info">
                <div className="title">
                  <h3>{showInfo.title}</h3>
                </div>
                <div className="show-extra-info">
                  <span className="rating">{showInfo.rating}</span>
                  <span>{showInfo.release_date}</span>
                  {showInfo.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                  {showInfo.languages.map((lang) => (
                    <span key={lang}>{lang}</span>
                  ))}
                  <span key={showInfo.seasons}>{showInfo.seasons} Seasons</span>
                </div>
                <div className="excerpt">
                  <span>{showInfo.excerpt}</span>
                </div>
                <div className="button-wrapper">
                  <button
                    className="start-watching"
                    onClick={() => launchVideoPlayer(showInfo.handle, 1)}
                  >
                    Start Watching
                  </button>
                  <button
                    className="add-to-watch-list"
                    onClick={() => addToWatchList(showInfo.handle)}
                  >
                    Add To Queue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="episode-list">
            <div className="tabs">
              <span className="active">Episodes &amp; Movies</span>
              <span>Details</span>
            </div>
            <div className="episode-list-container">
              {showInfo.episodes.map((episode) => (
                <div
                  className="episode-list-item"
                  key={episode.id}
                  data-id={episode.id}
                  onClick={() => launchVideoPlayer(showInfo.handle, episode.id)}
                >
                  <div className="thumbnail-wrapper">
                    <Thumbnail
                      show={showInfo.handle}
                      name={episode.thumbnail}
                    />
                    <div className="episode-rating">{showInfo.rating}</div>
                  </div>
                  <span className="episode-count">Episode {episode.id}</span>
                  <span className="episode-title">{episode.title}</span>
                  <span className="episode-languages">
                    {episode.duration} | {episode.languages.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ShowDetails;
