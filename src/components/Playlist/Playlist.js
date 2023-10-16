/* SETUP */
import React, { useCallback } from 'react';
import './Playlist.css';
import TrackList from '../Tracklist/Tracklist';
/* COMPONENT */
const PlayList = (props)=>{
    const nameHandler = useCallback((event)=>{
        props.onChangeName(event.target.value);
    },[props.onChangeName]);

    return (
        <div className='Playlist'>
            <input onChange={nameHandler} defaultValue={"New Playlist"} />
            <TrackList tracks={props.playlistTracks} isRemoval={true} onRemove={props.onRemove}/>
            <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
};

export default PlayList;