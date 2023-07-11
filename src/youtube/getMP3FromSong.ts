import ytdl from "ytdl-core";

export default async function getMP3FromSong(url: string) {
    let info = await ytdl.getInfo(url)
    let formats = ytdl.filterFormats(info.formats, 'audioonly')
    let format = ytdl.chooseFormat(formats, { quality: 'highestaudio' })

    return format.url
}