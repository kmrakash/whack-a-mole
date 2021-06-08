import React, { useEffect, useRef, useState } from "react";

function Timer( { time, interval = 1000, onEnd } ) {

    const [ internalTime, setInternalTime ] = useState( time );
    const timeRef = useRef( time );
    const timerRef = useRef( time );

    useEffect( () => {
        if ( internalTime === 0 && onEnd ) onEnd();
    }, [ internalTime, onEnd ] );

    useEffect( () => {
        timerRef.current = setInterval(
            () => setInternalTime( timeRef.current -= interval )
            , interval );

        return () => clearInterval( timerRef.current );
    }, [ interval ] );

    return <span className="info-text" >{`Time: ${ internalTime / 1000 }s`}</span>
}

export default Timer;