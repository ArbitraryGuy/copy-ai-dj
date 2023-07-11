//@ts-ignore
import ysa from "youtube-search-api"
import ytdl from "ytdl-core"

export default function searchSong(searchTerm: string): Promise<ytdl.videoInfo> {
    return new Promise(res => {
        ysa.GetListByKeyword(searchTerm, false).then((data: any) => {
            ytdl.getInfo("https://youtu.be/"+data.items[0].id).then((info: ytdl.videoInfo) => {
                res(info)
            })
        })
    })
}