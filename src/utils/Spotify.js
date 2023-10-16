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
                const expiresIn = Number(expiresInMatch[1]); //Extract token expiration time

                //Clear token if it expires (expiration time plus 1 second for event loop)
                window.setTimeout(()=>{accessToken=''}, expiresIn + 1000);

                //Remove the acces token from the url by updating history entry
                window.history.pushState('Access Token', null, '/');

                return accessToken;
            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
                window.location = accessUrl; // Redirect the user to Spotify's authorization page.
            }
    },

    /* Ask and get data from Api */


}

export default SpotifyApi;