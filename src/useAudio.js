import { useEffect, useState } from "react";

const useAudio = ( src, Volume = 1 ) => {
    const [ audio, setAudio ] = useState( null );
    console.log( src );

    useEffect( () => {
        const AUDIO = new Audio( src );
        AUDIO.volume = Volume;
        setAudio( AUDIO );
    }, [ src ] )

    return {
        play: audio.play(),
        pause: audio.pause(),
        stop: () => {
            audio.pause()
            audio.currentTime = 0
        }
    }
}

export default useAudio;