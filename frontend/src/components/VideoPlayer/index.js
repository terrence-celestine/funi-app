import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const VideoPlayer = () => {
  const navigate = useNavigate();
  const { showHandle, episodeID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAudioTrack, setAudioTrack] = useState("en");
  const [showData, setShowData] = useState([]);
  const [volumeBarStatus, setShowVolumeBar] = useState(false);
  const [overlayVisible, setOverlay] = useState(true);
  const [isPlaying, setPlayingStatus] = useState(false);
  const [isMuted, setPlayerVolume] = useState(true);
  const [playerTime, setPlayerTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("00:00");
  const [showSettingsFlag, setSettingsVisible] = useState(false);
  const [showTracksFlag, setTracksVisible] = useState(false);
  const videoRef = useRef();
  const volumeRef = useRef();
  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    fetch(`/episodes/${showHandle}/${episodeID}/meta`)
      .then((response) => response.json())
      .then((data) => {
        setShowData(data);
        setIsLoading(false);
      })
      .then(() => {
        const episode_progress = localStorage.getItem("episode_progress");
        if (episode_progress) {
          const lastSeenShows = JSON.parse(episode_progress);
          // look for the series within the local storage
          if (lastSeenShows[showHandle]) {
            var jumpToLastProgress = 0;
            if (lastSeenShows[showHandle]["episode"] === episodeID) {
              jumpToLastProgress = lastSeenShows[showHandle]["progress"];
              videoRef.current.currentTime = jumpToLastProgress;
            }
          }
        }
      });
  }, [isLoading, episodeID, showHandle]);

  const updateAudioTrack = (lang) => {
    const tracks = videoRef.current.textTracks;
    let index = 0;
    while (index < tracks.length) {
      if (tracks[index]["language"] === lang) {
        tracks[index]["mode"] = "showing";
        break;
      } else {
        tracks[index]["mode"] = "disabled";
        index += 1;
      }
    }
    if (lang !== "en") {
      videoRef.current.muted = true;
      audioRef.current.muted = false;
    } else {
      videoRef.current.muted = false;
      audioRef.current.muted = true;
    }
    setAudioTrack(lang);
    pauseVideo();
    playVideo();
  };
  const playVideo = () => {
    videoRef.current.play();
    if (selectedAudioTrack !== "en") {
      audioRef.current.play();
    }
  };
  const pauseVideo = () => {
    videoRef.current.pause();
    if (selectedAudioTrack !== "en") {
      audioRef.current.pause();
      audioRef.current.currentTime = videoRef.current.currentTime;
    }
    updateLastSeen();
  };
  const showOverlay = () => {
    setOverlay(true);
  };
  const hideOverlay = () => {
    if (isPlaying === false) {
      setOverlay(true);
    } else {
      setOverlay(false);
    }
  };
  const updatePlayerTime = (e) => {
    var time = e;
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    var totalTimeStr = String(minutes + ":" + seconds);
    setTotalTime(totalTimeStr);
  };
  const parseTime = (time) => {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    if (String(seconds).length === 1) {
      seconds = String("0") + String(seconds);
    }
    var totalTimeStr = String(minutes + ":" + seconds);
    setPlayerTime(totalTimeStr);
    updateProgressBar(time);

    if (
      Math.floor(time) > showData.intro_time &&
      Math.floor(time) <= showData.jump_time
    ) {
      updateSkipButton("show");
    } else if (Math.floor(time) > showData.jump_time) {
      updateSkipButton("hide");
    }

    if (Math.floor(time) % 15 === 0) {
      updateLastSeen();
    }
  };
  const updateLastSeen = () => {
    // get the current local storage value, update show within the array and save
    let lastSeenShows = JSON.parse(localStorage.getItem("episode_progress"));
    if (lastSeenShows) {
      lastSeenShows[showHandle] = {};
      lastSeenShows[showHandle] = {
        episode: episodeID,
        progress: videoRef.current.currentTime,
        duration: videoRef.current.duration,
      };
      localStorage.setItem("episode_progress", JSON.stringify(lastSeenShows));
    } else {
      const newShow = {
        [showHandle]: {
          episode: episodeID,
          progress: videoRef.current.currentTime,
          duration: videoRef.current.duration,
        },
      };
      localStorage.setItem("episode_progress", JSON.stringify(newShow));
    }
  };
  const updateSkipButton = (status) => {
    if (status === "show") {
      document.getElementById("skip-intro").classList.add("show-btn");
    } else {
      document.getElementById("skip-intro").classList.remove("show-btn");
    }
  };
  const mutePlayer = () => {
    if (isMuted) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }
    if (selectedAudioTrack !== "en") {
      audioRef.current.muted = false;
    } else {
      audioRef.current.muted = true;
    }
    setPlayerVolume(videoRef.current.muted);
  };
  const updateProgressBar = (time) => {
    var timeVal = Math.round(
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    );
    document.getElementById("progressBar").value = timeVal;
  };
  const updatePlayerStatus = () => {
    setPlayingStatus(!isPlaying);
    if (!isPlaying) {
      playVideo();
    } else {
      pauseVideo();
    }
  };
  const rewindPlayer = () => {
    var newTime = videoRef.current.currentTime - 30;
    if (newTime < 0) {
      newTime = 0;
    }
    videoRef.current.currentTime = newTime;
  };
  const forwardPlayer = () => {
    var newTime = videoRef.current.currentTime + 30;
    if (newTime > videoRef.current.duration) {
      newTime = videoRef.current.duration;
    }
    videoRef.current.currentTime = newTime;
  };
  const showVolumeBar = () => {
    setShowVolumeBar(true);
  };
  const hideVolumeBar = () => {
    setShowVolumeBar(false);
  };
  const updatePlayerVolume = (e) => {
    const value = e.clientX - volumeRef.current.offsetLeft;
    const seekto = (value / volumeRef.current.offsetWidth) * 100;
    volumeRef.current.value = Math.floor(seekto);
    var volumeValue = (value / volumeRef.current.offsetWidth) * 1.0;
    videoRef.current.volume = volumeValue;
    audioRef.current.volume = volumeValue;
  };
  const handleProgressBarClick = (e) => {
    const value = e.clientX - videoRef.current.offsetLeft;
    const seekto = (value / videoRef.current.offsetWidth) * 100;
    progressBarRef.current.value = seekto;
    videoRef.current.currentTime = (seekto / 100) * videoRef.current.duration;
    if (selectedAudioTrack !== "en") {
      audioRef.current.currentTime = (seekto / 100) * videoRef.current.duration;
    }
  };
  const goToPrevEpisode = () => {
    const episodeID = showData.id - 1;
    navigate(`/v/${showHandle}/${episodeID}`, { replace: false });
    window.location.reload();
  };
  const goToNextEpisode = () => {
    const episodeID = showData.id + 1;
    navigate(`/v/${showHandle}/${episodeID}`, { replace: false });
    window.location.reload();
  };
  const showSettings = () => {
    setSettingsVisible(!showSettingsFlag);
  };
  const showTrackOptions = () => {
    setTracksVisible(!showTracksFlag);
  };
  const returnToShowDetails = () => {
    navigate(`/shows/${showHandle}`, { replace: true });
  };
  const skipIntro = () => {
    videoRef.current.currentTime = showData.jump_time;
    document.querySelector("#skip-intro").classList.remove("show-btn");
  };

  const playIcon = require(`../../assets/video-player/play.png`);
  const pauseIcon = require(`../../assets/video-player/pause.png`);
  const volumeIcon = require(`../../assets/video-player/volume.png`);
  const mutedIcon = require(`../../assets/video-player/muted.png`);
  const languagesIcon = require(`../../assets/video-player/languages.png`);
  const rewindIcon = require(`../../assets/video-player/back.png`);
  const backIcon = require(`../../assets/video-player/close_player.png`);
  const fwrdIcon = require(`../../assets/video-player/fwrd.png`);
  const fullscreenIcon = require(`../../assets/video-player/fullscreen.png`);
  const settingsIcon = require(`../../assets/video-player/settings.png`);
  const previousIcon = require(`../../assets/video-player/prev_episode.png`);
  const nextIcon = require(`../../assets/video-player/next_episode.png`);
  const pauseCenterd = require(`../../assets/video-player/pause_centered.png`);
  const playCenterd = require(`../../assets/video-player/play_centered.png`);

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <div
          className="videoWrapper"
          onMouseEnter={showOverlay}
          onMouseLeave={hideOverlay}
        >
          <div id="infoOverlay" className={overlayVisible ? "showOverlay" : ""}>
            <div className="top">
              <div className="top-container">
                <div className="go-back" onClick={() => returnToShowDetails()}>
                  <img src={backIcon.default} alt="go back" />
                </div>
                <div className="meta">
                  <h2>{showHandle.replace("-", " ").toUpperCase()}</h2>
                  <span className="title">
                    Season 1 Episode {episodeID} - {showData.title}
                  </span>
                  {/* <span>
                    {showData.languages.map((lang) => (
                      <span>{lang}</span>
                    ))}
                  </span> */}
                  <span className="rating">{showData.rating}</span>
                </div>
              </div>
            </div>
            <div className="playCentered" onClick={() => updatePlayerStatus()}>
              {isPlaying ? (
                <img src={pauseCenterd.default} alt="" />
              ) : (
                <img src={playCenterd.default} alt="" />
              )}
            </div>
            <div className="bottom">
              <div id="settingsBox" className={showSettingsFlag ? "show" : ""}>
                <span>this is the settings box</span>
              </div>
              <button id="skip-intro" onClick={() => skipIntro()}>
                Skip Intro
              </button>
              <div className="controls-container">
                <div className="progress-bar">
                  <progress
                    ref={progressBarRef}
                    onClick={(e) => handleProgressBarClick(e)}
                    id="progressBar"
                    value="0"
                    max="100"
                  />
                </div>
                <div className="controls">
                  <div className="left">
                    {showData.prev_episode ? (
                      <div className="prev" onClick={() => goToPrevEpisode()}>
                        <img src={previousIcon.default} alt="" />
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      className="volume"
                      onMouseEnter={showVolumeBar}
                      onMouseLeave={hideVolumeBar}
                    >
                      <div className="icon" onClick={mutePlayer}>
                        {isMuted ? (
                          <img src={mutedIcon.default} alt="" />
                        ) : (
                          <img src={volumeIcon.default} alt="" />
                        )}
                      </div>
                      <span
                        className={
                          volumeBarStatus
                            ? "show-volume custom-volume-bar"
                            : "custom-volume-bar"
                        }
                      >
                        <progress
                          ref={volumeRef}
                          id="volume-bar"
                          onClick={(e) => updatePlayerVolume(e)}
                          value="20"
                          max="100"
                        ></progress>
                      </span>
                    </div>
                    <div className="timer">
                      <span className="current">{playerTime}</span>/
                      <span className="total">{totalTime}</span>
                    </div>
                  </div>
                  <div className="middle">
                    <div className="rewind" onClick={rewindPlayer}>
                      <img src={rewindIcon.default} alt="" />
                    </div>
                    <div className="play" onClick={() => updatePlayerStatus()}>
                      {isPlaying ? (
                        <img src={pauseIcon.default} alt="" />
                      ) : (
                        <img src={playIcon.default} alt="" />
                      )}
                    </div>
                    <div className="fast-fwrd" onClick={forwardPlayer}>
                      <img src={fwrdIcon.default} alt="" />
                    </div>
                  </div>
                  <div className="right">
                    <div className="full-screen">
                      <img src={fullscreenIcon.default} alt="" />
                    </div>
                    <div
                      className="languages"
                      onClick={() => showTrackOptions()}
                    >
                      <div
                        id="trackOptions"
                        className={showTracksFlag ? "show" : ""}
                      >
                        <span
                          data-language="en"
                          className={
                            selectedAudioTrack === "en" ? "active" : ""
                          }
                          onClick={() => updateAudioTrack("en")}
                        >
                          English
                        </span>
                        <span
                          data-language="jp"
                          className={
                            selectedAudioTrack === "jp" ? "active" : ""
                          }
                          onClick={() => updateAudioTrack("jp")}
                        >
                          Japanese
                        </span>
                      </div>
                      <img src={languagesIcon.default} alt="" />
                    </div>
                    <div className="settings" onClick={() => showSettings()}>
                      <img src={settingsIcon.default} alt="" />
                    </div>
                    {showData.next_episode ? (
                      <div className="next" onClick={() => goToNextEpisode()}>
                        <img src={nextIcon.default} alt="" />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <video
            ref={videoRef}
            preload="metadata"
            onLoadedMetadata={(e) => updatePlayerTime(e.target.duration)}
            onTimeUpdate={(e) => parseTime(e.target.currentTime)}
            onLoadedData={() => updatePlayerStatus()}
            controls={false}
            muted={true}
            playsInline
          >
            <source
              type="video/mp4"
              src={`/episodes/${showHandle}/${episodeID}`}
            />
            <track
              label="English"
              kind="subtitles"
              srcLang="jp"
              src={`/subtitles/${showHandle}/${episodeID}`}
            ></track>
          </video>
          <audio ref={audioRef} id="a1" mediaGroup="a11y_vid">
            <source
              src={`/episodes/${showHandle}/${episodeID}/audio`}
              type="audio/aac"
            />
          </audio>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
