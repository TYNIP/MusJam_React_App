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
          <h3><a href={`https://open.spotify.com/intl-es/track/${track.id}`} target='_blank' rel='noreferrer'>{track.name}</a></h3>
          
          <p><a href={`https://open.spotify.com/search/${track.artist}`} target='_blank' rel='noreferrer' >{track.artist}</a> | <a href={`https://open.spotify.com/search/${track.album}`} target='_blank' rel='noreferrer'>{track.album}</a></p>
        </div>
        {renderTracks()}
      </div>
    );
  };

export default Track;


