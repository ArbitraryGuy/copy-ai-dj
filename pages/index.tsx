import { adjustVolume } from "@/src/ui/fade"
import getMP3FromSong from "@/src/youtube/getMP3FromSong"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"

export interface ISong {
  start: number
  end: number
}

export default function Home() {
  const audioElement = useRef<HTMLAudioElement>(null)
  const [song, setSong] = useState<ISong | null>(null)

  const newSong = () => {
    return new Promise(res => {
      fetch("/api/playlist").then(res => res.json()).then(async data => {
        let song = await fetch("/api/getUrl?url=" + data.url).then(res => res.json())
        audioElement.current!.src = song.formats[0].url
        audioElement.current!.play()

        let startMs = data.start
        let endMs = data.end

        setSong({
          start: startMs,
          end: endMs
        })

        audioElement.current!.currentTime = startMs / 1000;
        audioElement.current!.play()
        adjustVolume(audioElement.current!, 1)

        res(true)
      })
    })
  }

  useEffect(() => {
    if (audioElement.current) {
      audioElement.current!.volume = 0
      toast.promise(
        newSong(),
        {
          loading: "Loading playlist...",
          success: "Playlist loaded!",
          error: "Failed to load playlist."
        }
      )

      audioElement.current!.onplay = () => {
        adjustVolume(audioElement.current!, 1)
      }

      let fadingOut = false;
      //fade out before 4s of the song.end
      // audioElement.current!.ontimeupdate = () => {
      //   if (song && audioElement.current!.currentTime * 1000 >= song.end - 4000 && !fadingOut) {
      //     fadingOut = true;
      //     adjustVolume(audioElement.current!, 0)
      //     setTimeout(() => {
      //       newSong()
      //       fadingOut = false;
      //     }, 3500)
      //   }
      // }
    }
  }, [audioElement.current])

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">AI DJ</h1>
      <audio className="mt-10 mb-10" ref={audioElement} controls />
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => {
        if (audioElement.current) {
          audioElement.current.play()
        }
      }}>Play</button>
    </div>
  )
}
