let userAccesToken = "";
const clientID = "c57610603fbc4ba0aa2597610c122d82";
const redirectURI = "https://remix375.github.io/jamming/";


//dev
//const redirectURI = "http://localhost:3000/";




const Spotify = {
    getAccessToken() {
        if (userAccesToken) {
            return userAccesToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expireDateMatch = window.location.href.match(/expires_in=([^&]*)/)



        if (accessTokenMatch && expireDateMatch) {
            userAccesToken = accessTokenMatch[1];
            const expiresIn = Number(expireDateMatch[1])

            window.history.pushState('Access Token', null, '/jamming');
            window.setTimeout(() => userAccesToken = '', expiresIn * 1000);
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`

        }

    },


    search(searchTerm) {
        this.getAccessToken()
        if (!searchTerm) {
            return
        }
        let value = fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${userAccesToken}`
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            let Response = jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    image: track.album.images[0].url,
                    uri: track.uri
                }
            })
            return Response;
        })
        return value


    },



    savePlaylist(name, trackArray) {
        this.getAccessToken()

        if (!name || !trackArray.length) {
            return
        }


        let token = userAccesToken;
        console.log(token)
        const headers = {Authorization: `Bearer ${token}`}
        let userId;
        


        return fetch(`https://api.spotify.com/v1/me`, {
            headers: headers
        })
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id
            console.log(userId, "id")
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse, "resp")
                const playlistID = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({"uris": trackArray})
                })
            })


        })
    








    }






}

Spotify.getAccessToken()

export default Spotify;