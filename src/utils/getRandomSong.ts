import songs from "@/songs.json"

export default function getRandomSong() {
    return songs[Math.floor(Math.random() * songs.length)]
}