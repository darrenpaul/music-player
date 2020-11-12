import { faDivide } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, changeSongEvent, libraryState }) => {
  return (
    <div className={`library ${libraryState ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            key={song.id}
            song={song}
            changeSongEvent={changeSongEvent}
          />
        ))}
      </div>
    </div>
  );
};
export default Library;
