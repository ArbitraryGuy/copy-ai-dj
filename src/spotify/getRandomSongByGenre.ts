import getSpotifyClient from "./getSpotifyClient";

export default async function getRandomSongByGenre(genre: string) {
    let spotifyApi = await getSpotifyClient()

    const response = await spotifyApi.searchTracks(`genre:"${genre}"`, {
        limit: 50,
    });

    if (!response.body.tracks || response.body.tracks.items.length === 0) {
        console.log("No tracks found in the response");
        return;
    }
    const randomIndex = Math.floor(
        Math.random() * response.body.tracks.items.length
    );
    const track = response.body.tracks.items[randomIndex];
    
    return track;
}