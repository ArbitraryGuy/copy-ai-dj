import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    let url = req.query.url;
    if (typeof url !== "string") {
        res.status(400).send("No url provided");
        return;
    }

    ytdl.getInfo(url).then((info) => {
        let formats = ytdl.filterFormats(info.formats, "audioonly");
        
        res.send({
            title: info.videoDetails.title,
            formats
        })
    })
}