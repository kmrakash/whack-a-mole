import { useEffect, useState } from "react";

const usePersistenceState = ( key, initialValue ) => {
    const [ state, setState ] = useState(
        window.localStorage.getItem( key )
            ? JSON.parse( window.localStorage.getItem( key ) )
            : initialValue
    );

    useEffect( () => {
        window.localStorage.setItem( key, state );
    }, [ key, state ] );

    return [ state, setState ];

}

export default usePersistenceState;