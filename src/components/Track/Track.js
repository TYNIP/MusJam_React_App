/* SETUP */
import React, { useCallback } from 'react';
import './Track.css';

/* COMPONENT */
const Track = (props)=>{
    /* ADD TRACKS */
    const addTrack = useCallback(event=>{
        props.onAdd(props.track);
    }, [props.onAdd, props.track]);

    /* Remove Track */
    const removeTrack = useCallback(event=>{
        props.onRemove(props.track);
    },[props.onRemove, props.track]);

    /* RENDER Tracks*/
    const renderTracks =()=>{
        if(props.isRemoval){
            return(
                <button className='Track-Render' onClick={removeTrack}>-</button>
            );
        } else {
            return(
                <button className='Track-Render' onClick={addTrack}>+</button>
            )
        }
    };

    /* GENERAL RETURN - Info Track*/
    return (
        <div className='Track'>
            <div className='Track-information'>
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {renderTracks()}
        </div>
    )
};

export default Track;


