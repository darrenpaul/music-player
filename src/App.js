import React, { useState, useRef, useEffect } from "react";
import "./styles/app.scss";
import Nav from "./componenets/Nav";
import Player from "./componenets/Player";
import Song from "./componenets/Song";
import Library from "./componenets/Library";
import data from "./data";

function App() {
  // STATE
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryState, setLibraryState] = useState(false);

  // REF
  const audioRef = useRef(null);

  // EVENTS
  const nextSongEvent = (song, direction, play = false) => {
    let index = songs.findIndex((ele) => song.id === ele.id);
    if (direction === "forward") {
      index = (index + 1) % songs.length;
    }
    if (direction === "back") {
      if (index - (1 % songs.length) === -1) {
        index = songs.length - 1;
      } else {
        index = (index - 1) % songs.length;
      }
    }
    changeSongEvent(songs[index], play);
  };
  const changeSongEvent = async (song, play) => {
    const _songs = songs.map((ele) => {
      if (song.id === ele.id) {
        ele.active = true;
      } else {
        ele.active = false;
      }
      return ele;
    });
    setSongs(_songs);
    setCurrentSong(song);
    if (isPlaying === true) {
      const audio = await audioRef;
      audio.current.play();
    }
  };

  return (
    <div className={`App ${libraryState ? "library-active" : ""}`}>
      <Nav libraryState={libraryState} setLibraryState={setLibraryState} />
      <Song song={currentSong} isPlaying={isPlaying} />
      <Player
        audioRef={audioRef}
        song={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        nextSongEvent={nextSongEvent}
      />
      <Library
        songs={songs}
        changeSongEvent={changeSongEvent}
        libraryState={libraryState}
      />
    </div>
  );
}

export default App;
