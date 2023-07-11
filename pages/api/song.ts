import getRandomSongByGenre from '@/src/spotify/getRandomSongByGenre'
import searchSong from '@/src/youtube/searchSong'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let { genre } = req.query
    if(!genre) return res.status(400).json({ error: "No genre provided" })

    let songData = await getRandomSongByGenre(genre as string)
    if(!songData) return res.status(400).json({ error: "No song found" })

    let song = await searchSong(`${songData.name} by ${songData.artists[0].name}`)

    res.status(200).json(song)
}
