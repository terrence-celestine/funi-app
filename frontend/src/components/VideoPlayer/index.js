import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./index.css";

const VideoPlayer = () => {
  const { showHandle, episodeID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [volumeBarStatus, setShowVolumeBar] = useState(false);
  const [overlayVisible, setOverlay] = useState(true);
  const [isPlaying, setPlayingStatus] = useState(false);
  const [isMuted, setPlayerVolume] = useState(false);
  const [playerTime, setPlayerTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState(0);
  const videoRef = useRef();
  const volumeRef = useRef();
  const playVideo = () => {
    videoRef.current.play();
  };
  const pauseVideo = () => {
    videoRef.current.pause();
  };
  const showOverlay = () => {
    setOverlay(true);
  };
  const hideOverlay = () => {
    console.log(isPlaying);
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
    console.log("before", isPlaying);
    setPlayingStatus(!isPlaying);
    console.log("after", isPlaying);
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
  };

  const goToNextEpisode = () => {};

  const playIcon = require(`../../assets/video-player/play.png`);
  const pauseIcon = require(`../../assets/video-player/pause.png`);
  const volumeIcon = require(`../../assets/video-player/volume.png`);
  const mutedIcon = require(`../../assets/video-player/muted.png`);
  const languagesIcon = require(`../../assets/video-player/languages.png`);
  const rewindIcon = require(`../../assets/video-player/rewind.png`);
  const backIcon = require(`../../assets/video-player/back.png`);
  const fwrdIcon = require(`../../assets/video-player/forward.png`);
  const fullscreenIcon = require(`../../assets/video-player/fullscreen.png`);
  const settingsIcon = require(`../../assets/video-player/settings.png`);

  return (
    <>
      {isLoading === false ? (
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
                <div
                  className="go-back"
                  onClick={() => alert("clicked go back")}
                >
                  <img src={backIcon.default} alt="go back" />
                </div>
                <div className="meta">
                  <h2>{showHandle}</h2>
                  <span>Season 1 Episode {episodeID} - Episode Title</span>
                  <span>Language</span>
                  <span>Rating</span>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="progress-bar">
                <progress id="progressBar" value="0" max="100" />
              </div>
              <div className="controls">
                <div className="left">
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
                  <div className="languages">
                    <img src={languagesIcon.default} alt="" />
                  </div>
                  <div className="settings">
                    <img src={settingsIcon.default} alt="" />
                  </div>
                  <div className="next" onClick={() => goToNextEpisode()}>
                    <img src={fwrdIcon.default} alt="" />
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
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
