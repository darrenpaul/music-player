import React from "react";

const LibrarySong = ({ song, changeSongEvent }) => {
  const songSelectHandler = () => {
    changeSongEvent(song);
  };
  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h3>{song.artist}</h3>
      </div>
    </div>
  );
};

export default LibrarySong;
