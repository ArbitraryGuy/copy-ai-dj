export async function adjustVolume(
    element: HTMLAudioElement,
    newVolume: number,
    {
        duration = 4000,
        easing = swing,
        interval = 13,
    }: {
        duration?: number,
        easing?: typeof swing,
        interval?: number,
    } = {},
): Promise<void> {
    const originalVolume = element.volume;
    const delta = newVolume - originalVolume;

    if (!delta || !duration || !easing || !interval) {
        element.volume = newVolume;
        return Promise.resolve();
    }

    const ticks = Math.floor(duration / interval);
    let tick = 1;

    return new Promise(resolve => {
        const timer = setInterval(() => {
            element.volume = originalVolume + (
                easing(tick / ticks) * delta
            );

            if (++tick === ticks + 1) {
                clearInterval(timer);
                resolve();
            }
        }, interval);
    });
}

export function swing(p: number) {
    return 0.5 - Math.cos(p * Math.PI) / 2;
}