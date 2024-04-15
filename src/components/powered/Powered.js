import React from 'react';
import img from '../../img/spotify-ar21.svg';
import './powered.css';

export default function PoweredBy(){
    return(
        <section id='powered'>
            <h1>Powered By</h1>
            <a href='https://open.spotify.com' target='_blank' rel='noreferrer'><img src={img} alt='spotify'></img></a>
        </section>
    )
}