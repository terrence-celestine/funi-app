import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const VideoPlayer = () => {
  const navigate = useNavigate();
  const { showHandle, episodeID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showData, setShowData] = useState([]);
  const [volumeBarStatus, setShowVolumeBar] = useState(false);
  const [overlayVisible, setOverlay] = useState(true);
  const [isPlaying, setPlayingStatus] = useState(false);
  const [isMuted, setPlayerVolume] = useState(false);
  const [playerTime, setPlayerTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("00:00");
  const [showSettingsFlag, setSettingsVisible] = useState(false);
  const videoRef = useRef();
  const volumeRef = useRef();
  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    const episode_progress = localStorage.getItem("episode_progress");
    const initialValue = JSON.parse(episode_progress);
    var jumpToLastProgress = 0;
    if (initialValue["episode"] === episodeID) {
      jumpToLastProgress = initialValue["progress"];
      videoRef.current.currentTime = jumpToLastProgress;
    }
    fetch(`/episodes/${showHandle}/${episodeID}/meta`)
      .then((response) => response.json())
      .then((data) => {
        setShowData(data);
        setIsLoading(false);
      });
  }, []);

  const updateAudioTrack = () => {
    pauseVideo();
    const time = videoRef.current.currentTime;
    audioRef.current.currentTime = time;
    videoRef.current.muted = true;
    playVideo();
    audioRef.current.play();
  };
  const playVideo = () => {
    videoRef.current.play();
  };
  const pauseVideo = () => {
    console.log("setting cookie");
    videoRef.current.pause();
    localStorage.setItem(
      "episode_progress",
      JSON.stringify({
        handle: showHandle,
        episode: episodeID,
        progress: videoRef.current.currentTime,
      })
    );
    console.log(
      JSON.stringify({
        handle: showHandle,
        episode: episodeID,
        progress: videoRef.current.currentTime,
      })
    );
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

    if (Math.floor(time) === showData.intro_time) {
      showSkipButton();
    }

    if (Math.floor(time) % 15 === 0) {
      console.log("updating local cookie");
      localStorage.setItem(
        "episode_progress",
        JSON.stringify({
          handle: showHandle,
          episode: episodeID,
          progress: videoRef.current.currentTime,
        })
      );
    }
  };

  const showSkipButton = () => {
    document.getElementById("skip-intro").classList.add("show-btn");
  };

  const mutePlayer = () => {
    if (isMuted) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
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
    var newTime = videoRef.current.currentTime - 10;
    if (newTime < 0) {
      newTime = 0;
    }
    videoRef.current.currentTime = newTime;
  };
  const forwardPlayer = () => {
    var newTime = videoRef.current.currentTime + 10;
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
  };

  const handleProgressBarClick = (e) => {
    const value = e.clientX - videoRef.current.offsetLeft;
    const seekto = (value / videoRef.current.offsetWidth) * 100;
    progressBarRef.current.value = seekto;
    videoRef.current.currentTime = (seekto / 100) * videoRef.current.duration;
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
            <div id="settingsBox" class={showSettingsFlag ? "show" : ""}>
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
                  <div className="languages" onClick={() => updateAudioTrack()}>
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
        >
          <source
            type="video/mp4"
            src={`/episodes/${showHandle}/${episodeID}`}
          />
          <track
            label="English"
            kind="subtitles"
            srcLang="jp"
            src={`/subtitles/demon-slayer/ep1`}
          ></track>
        </video>
        <audio ref={audioRef} id="a1" mediaGroup="a11y_vid">
          <source
            src={`/episodes/${showHandle}/${episodeID}/audio`}
            type="audio/aac"
          />
        </audio>
      </div>
    </>
  );
};

export default VideoPlayer;
