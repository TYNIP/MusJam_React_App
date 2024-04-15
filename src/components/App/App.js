import React, { useCallback, useState } from 'react';
/* COMPONENTS */
import SearchBar from '../SearchBars/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';
import SpotifyApi from '../../utils/Spotify';
import Powered from '../powered/Powered';
/* Styles */
import './App.css';

/* APP */
function App() {
  /* FUNCTIONS */
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  
  /* FOR SEARCHBAR */
  //Search for track using the Spotify Api
  const search = useCallback((term)=>{
    SpotifyApi.search(term).then(setSearchResults);
  },[]);

  /* For Search Results */
  //Add tracks to playlist
  const addTrack = useCallback(track=>{
    if(playlistTracks.some(saved=> saved.id === track.id)){
      return;
    }
    setPlaylistTracks((prevTracks)=>[...prevTracks, track])
  }, [playlistTracks]);
  
  /* FOR PLAYLIST */
  //Update name of playlist
  const updatePlaylistName = useCallback(name=>{
    setPlaylistName(name);
  },[])

  //Remove tracks by filtering the diference between the current list and past one
  const removeTrack = useCallback(track=>{
    setPlaylistTracks((prevTracks)=>prevTracks.filter(currentTrack=>currentTrack.id !== track.id));
  },[]);

  //Save playlist using the spotify API
  const savePlaylist = useCallback(()=>{
    const trackUris = playlistTracks.map(track=>track.uri)
    SpotifyApi.savePlaylist(playlistName, trackUris).then(()=>{
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    })
  },[playlistName, playlistTracks]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Mu<span>sJ</span>am</h1>
        <span style={{fontSize: '20px'}}>Developed by: <a href='https://github.com/TYNIP' target='_blank' rel='noreferrer'>TYNIP</a></span>
      </header>
      <Powered/>
      <SearchBar onSearch={search}></SearchBar>
      <div className='AppPlayList'>
        <SearchResults searchResults={searchResults} onAdd={addTrack}/>
        <PlayList 
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onNameChange={updatePlaylistName}
          onRemove={removeTrack}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
