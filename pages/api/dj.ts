//@ts-nocheck
import getRandomSong from "@/src/utils/getRandomSong";
import getMostReplayed from "@/src/youtube/getMostReplayed";
import searchSong from "@/src/youtube/searchSong";
import { NextApiRequest, NextApiResponse } from "next";
import { pipeline } from "stream";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let songInfo = getRandomSong();
  let song = await searchSong(`${songInfo.name} by ${songInfo.artist}`);
  let mostReplayed = await getMostReplayed(song.videoDetails.videoId);

  if (!mostReplayed) return handler(req, res);
  console.log(mostReplayed);

  let url = `https://www.youtube.com/watch?v=${song.videoDetails.videoId}`;
  let { start, end } = mostReplayed;

  const rangeHeader = `bytes=${start}-${end}`;

  const response = await fetch(url, {
    headers: {
      Range: rangeHeader,
    },
  });

  const contentLength = parseInt(response.headers.get("content-length") || "0", 10);
  const contentRange = response.headers.get("content-range") || "";
  const [, totalLength] = contentRange.match(/\/(\d+)/) || [, contentLength];

  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Content-Length", contentLength);
  res.setHeader("Content-Range", `bytes ${start}-${end}/${totalLength}`);
  res.setHeader("Cache-Control", "public, max-age=31536000");
  res.setHeader("Access-Control-Allow-Origin", "*");

  pipeline(response.body, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
  });
}
