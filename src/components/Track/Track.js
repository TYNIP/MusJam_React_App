/* SETUP */
import React, { useCallback } from 'react';
import './Track.css';

/* COMPONENT */
const Track = ({ onAdd, onRemove, isRemoval, track }) => {
    const addTrack = useCallback((event) => {
      onAdd(track);
    }, [onAdd, track]);
  
    const removeTrack = useCallback((event) => {
      onRemove(track);
    }, [onRemove, track]);
  
    const renderTracks = () => {
      if (isRemoval) {
        return (
          <button className='Track-Render' onClick={removeTrack}>-</button>
        );
      } else {
        return (
          <button className='Track-Render' onClick={addTrack}>+</button>
        )
      }
    };
  
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        {renderTracks()}
      </div>
    );
  };

export default Track;


