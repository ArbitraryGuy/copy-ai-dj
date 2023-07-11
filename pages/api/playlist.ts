import getRandomSong from '@/src/utils/getRandomSong'
import getMostReplayed from '@/src/youtube/getMostReplayed'
import searchSong from '@/src/youtube/searchSong'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let songInfo = getRandomSong()
  let song = await searchSong(`${songInfo.name} by ${songInfo.artist}`)
  let mostReplayed = await getMostReplayed(song.videoDetails.videoId)

  if(!mostReplayed) return handler(req, res)

  return res.status(200).json({
    name: songInfo.name,
    artist: songInfo.artist,
    url: song.videoDetails.video_url,
    start: mostReplayed.start,
    end: mostReplayed.end
  })
}
