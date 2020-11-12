import React from "react";

const Song = ({ song, isPlaying }) => {
  return (
    <div className="song-container">
      <img
        className={isPlaying ? "rotateSong" : ""}
        src={song.cover}
        alt={song.name}
      ></img>
      <h2>{song.name}</h2>
      <h3>{song.artist}</h3>
    </div>
  );
};
export default Song;
