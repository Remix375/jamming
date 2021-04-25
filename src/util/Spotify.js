let userAccesToken = "BQAA7ZUaYrT12me4SP5mTSsVoUOraUsegaS0e4jpuFv5uTUxWyL1DHwsSKbZSSIbIjdTxLJxzqsc0VFp20DZ0XSfxXQSPbxAV5X3veTtvEMHlwcakJFduvNZ9EnhU1rlnJvVPZhCwrsSFfH_NyF2AHMAyr5P3YidXVe54TKYtUWNopAFZg2CbKnK9kmHkvs";
const clientID = "c57610603fbc4ba0aa2597610c122d82";
const redirectURI = "http://localhost:3000/";

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


            window.setTimeout(() => userAccesToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`)
        }

    },


    search(searchTerm) {
        console.log(searchTerm)
        let value = fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${userAccesToken}`
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse)
            let Response = jsonResponse.tracks.items.map(track => {
                console.log("good")
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            })
            console.log(Response)
            return Response;
        })
        return value


    }




}


export default Spotify;