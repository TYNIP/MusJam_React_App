/* SETUP */
import React, { useCallback } from 'react';
import './Playlist.css';
import TrackList from '../Tracklist/Tracklist';
/* COMPONENT */
const PlayList = ({ onNameChange, playlistTracks, onRemove, onSave }) => {
    const nameHandler = useCallback((event) => {
      onNameChange(event.target.value);
    }, [onNameChange]);
  
    return (
      <div className='Playlist'>
        <input onChange={nameHandler} defaultValue={"New Playlist"} />
        <TrackList tracks={playlistTracks} isRemoval={true} onRemove={onRemove} />
        <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  };

export default PlayList;