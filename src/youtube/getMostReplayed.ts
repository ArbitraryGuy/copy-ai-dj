export default async function getMostReplayed(id: string) {
    try {
        let data = await fetch("https://yt.lemnoslife.com/videos?part=mostReplayed&id=" + id).then(res => res.json())

        const start =
            data.items[0].mostReplayed.heatMarkersDecorations[0]
                .timedMarkerDecorationRenderer.visibleTimeRangeStartMillis;
        const end =
            data.items[0].mostReplayed.heatMarkersDecorations[0]
                .timedMarkerDecorationRenderer.visibleTimeRangeEndMillis;

        return {
            start,
            end
        }

    } catch (e) {
        console.log(e)
        return null
    }
}