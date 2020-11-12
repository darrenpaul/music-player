import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ song, isPlaying, setIsPlaying, audioRef, nextSongEvent }) => {
  // STATE
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPerecentage: 0,
  });

  // EVENTS
  const playSongHandler = () => {
    if (isPlaying === true) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrentTime = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPerecentage = Math.round(
      (roundedCurrentTime / roundedDuration) * 100
    );
    setSongInfo({ ...songInfo, currentTime, duration, animationPerecentage });
    // ROTATE IMAGE
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    const currentTime = e.target.value;
    audioRef.current.currentTime = currentTime;
    setSongInfo({ ...songInfo, currentTime });
  };
  const skipTrackHandler = (direction, play = false) => {
    nextSongEvent(song, direction, play);
  };
  //  ADD STYLES
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPerecentage}%)`,
  };
  return (
    <div className="player">
      <h1>Player</h1>
      <div className="time-control">
        <p>{songInfo.currentTime ? getTime(songInfo.currentTime) : "0:00"}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${song.color[0]},${song.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          onClick={() => skipTrackHandler("back")}
        />
        <FontAwesomeIcon
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={() => skipTrackHandler("forward")}
        />
      </div>
      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={() => {
          setTimeout(() => {
            skipTrackHandler("forward", true);
          });
        }}
      />
    </div>
  );
};
export default Player;
