/* SETUP */
import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track';
/* component */
const Tracklist = (props) => {
    return(
        /* Iterate for each class that is present in Track*/
        <div className='trackList'>
            {/* {
                props.tracks.map((track)=>{
                    return (
                        <Track
                            track={track}
                            key={track.id}
                            onAdd={track.onAdd}
                            isRemoval={track.isRemoval}
                            onRemove={track.onRemove}
                        />
                    );
                })}; */}
        </div>
    );
};

export default Tracklist;
