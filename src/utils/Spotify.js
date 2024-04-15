/* SETUP */
const clientId =  process.env.CLIENT_KEY;
const redirectUri = 'https://spotyjam.netlify.app/'; 
let accessToken; //Spotify Acces Token

/* General function */
const SpotifyApi = {
    async getAccessToken(){
        if (accessToken){return accessToken};
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch){
                accessToken = accessTokenMatch[1]; 
                window.history.pushState('Access Token', null, '/');

                return accessToken;
            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
                window.location = accessUrl; 
            }
    },

    async search(term){
        const accessToken = await SpotifyApi.getAccessToken();

        /* End Point */
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            /* Authorisation */
            headers:{
                Authorization: `Bearer ${accessToken}`, 
            },
        });

        //Parse response to JSON 
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks){ 
            return [];
        } else {
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
        if (!name && !!trackUris.length){
            return;
        }

        const accessToken = await SpotifyApi.getAccessToken();  
        const headers = { Authorization: `Bearer ${accessToken}` }; 
        let userId;


        const userResponse = await fetch('https://api.spotify.com/v1/me',{ headers });
        const userJsonResponse = await userResponse.json();
        userId = userJsonResponse.id;

        const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            headers,
            method: 'POST',
            body: JSON.stringify({name:name}), 
        });

        const playlistJsonResponse = await playlistResponse.json();
        const playlistId = playlistJsonResponse.id;

        await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
            headers,
            method: 'POST',
            body: JSON.stringify({uris:trackUris}), 
        });

        alert("Playlist saved successfully");
    },
};

export default SpotifyApi;