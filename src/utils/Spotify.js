/* SETUP */
const clientId = ''; //Spotify Clien Id
const redirectUri = 'http://localhost:3000/'; //Accepted spotify redirect URI
let accessToken; //Spotify Acces Token

/* General function */
const SpotifyApi = {
    /* GET ACCES TOKEN status(if it is valid or it has expired) */
    async getAccessToken(){
        //If an access token already exist, return it.
        if (accessToken){return accessToken};

        //Get token if there is not already one
            //Check if the access token and expiration time are in the current url 
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch){
                accessToken = accessTokenMatch[1]; //Extract and access ONLY token from url 

                //Remove the acces token from the url by updating history entry
                window.history.pushState('Access Token', null, '/');

                return accessToken;
            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
                window.location = accessUrl; // Redirect the user to Spotify's authorization page.
            }
    },

    /* Ask and get data from Api | Search component connection*/
    async search(term){
        const accessToken = await SpotifyApi.getAccessToken(); //Get access, valid token already checked by prev function

        //Request Spotify search endpoint to search tracks 
                                        /* End Point */
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            /* Authorisation */
            headers:{
                Authorization: `Bearer ${accessToken}`, //Access token in the request headers.
            },
        });

        //Parse response to JSON 
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks){ //If there are no tracks return an empty array
            return [];
        } else {
            //If there is data Map the track data to a simplified format and return it
            return jsonResponse.tracks.items.map(track =>({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }));
        };
    },

    /* ACCESS USER ACOUNT| POST playlist, and post access and changes by adding songs*/
    async savePlaylist(name, trackUris){
        // If the name or track URIs are missing, do nothing and return.
        if (!name && !!trackUris.length){
            return;
        }

        //Validate tokens for ensuring correct access and optimal post requests of playlist
        const accessToken = await SpotifyApi.getAccessToken();  // Get valid access token
        const headers = { Authorization: `Bearer ${accessToken}` }; //Access token in the request headers.
        let userId;

        //Get users ID by sending a request to Spotify's "me" endpoint
        const userResponse = await fetch('https://api.spotify.com/v1/me',{ headers });
        const userJsonResponse = await userResponse.json();
        userId = userJsonResponse.id;

        // Create a new playlist by sending a POST request to the user's playlists endpoint with the user id
        const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            headers,
            method: 'POST',
            body: JSON.stringify({name:name}), // Include the playlist name in the request body.
        });

        //Parse response to json
        const playlistJsonResponse = await playlistResponse.json();
        
        // Extract the ID of the created playlist for final post of tracks
        const playlistId = playlistJsonResponse.id;

        // Add tracks to the newly created playlist by sending a POST request to the playlist's tracks endpoint.
        await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
            headers,
            method: 'POST',
            body: JSON.stringify({uris:trackUris}), // Include the track URIs in the request body.
        });

        alert("Playlist saved successfully");
    },
};

export default SpotifyApi;