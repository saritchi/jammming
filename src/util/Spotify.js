let accessToken = undefined;
let expiresIn = undefined;
const clientId = '3e6c5f7fdc2f4ac7973ee5f586321e19';
const redirectURI = 'http://srjam.surge.sh/';
const spotifyURL = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectURI}`;

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
        return fetch(searchUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse)
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                })
            );
        })
    },

    savePlaylist(name, trackUris) {
        if(!name || !trackUris){
            return;
        }
        const token = accessToken;
        const headerAuth = { Authorization: `Bearer ${token}` }
        let userID = undefined;
        // Fetch UserId
        return fetch(`https://api.spotify.com/v1/me`, {
            method: 'GET',
            headers: headerAuth,
        }).then(response => {
            if(response.ok) {
                return response.json();
            }
        }).then(jsonResponse => userID = jsonResponse.id)
        .then(() => {
            console.log(userID)
            const newPlaylistUrl = `https://api.spotify.com/v1/users/${userID}/playlists`;
            return fetch(newPlaylistUrl, {
                method: 'POST',
                headers: headerAuth,
                body: JSON.stringify({name: name})
            }).then(response => response.json())
            }).then(jsonResponse => {
                console.log(jsonResponse)
                const playlistID = jsonResponse.id
                console.log(playlistID)
                const newPlaylistTrackUrl = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
                return fetch(newPlaylistTrackUrl, {
                    method: 'POST',
                    headers: headerAuth,
                    body: JSON.stringify({uris: trackUris})
                })
            })
    }
};

export default Spotify;