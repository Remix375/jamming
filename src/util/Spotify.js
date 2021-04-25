let userAccesToken = "";
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

    }




}


export default Spotify;