import SearchBar from "../Components/SearchBar/SearchBar";

let accessToken = undefined;
let expiresIn = undefined;
const clientId = `3e6c5f7fdc2f4ac7973ee5f586321e19`;
const redirectURI = `http://localhost:3000/`;
const spotifyURL = `https://accounts.spotify.con/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

const Spotify = {
    getAccessToken() {
        if(accessToken){
            return accessToken;
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if(urlAccessToken && urlExpiresIn){
            accessToken = urlAccessToken[1];
            expiresIn = urlExpiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = spotifyURL;
        }
    },

    search(term) {
        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`
        fetch(searchUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    url: track.uri
                }
            });
        })
    }
};

export default Spotify;