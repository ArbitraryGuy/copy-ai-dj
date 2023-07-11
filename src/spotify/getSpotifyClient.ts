//@ts-ignore
import SpotifyWebApi from "spotify-web-api-node";

export default async function getSpotifyClient() {
    const spotifyApi = new SpotifyWebApi({
        clientId: "5afabe38cf92469298c88e0da6eb7e58",
        clientSecret: "e8314875b2d34431ae4cdaa49dd8230c",
    });

    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body.access_token);

    return spotifyApi;
}