import React, { useState } from "react";
import { render } from "react-dom"
import gsap from "gsap";
import Timer from "./Timer";
import Mole from "./Mole";
import usePersistenceState from "./usePersistence";
// import useAudio from "./useAudio";


const TIME_LIMIT = 30000;
const MOLE_SCORE = 100;
const NUMBER_OF_MOLES = 5;


const Moles = ( { children } ) => <div className="moles">{children}</div>;
// const Mole = () => <button>Mole</button>
// const Timer = () => <div>Time : 00:00</div>
const Score = ( { value, text } ) => <div className="info-text" >{`${ text } : ${ value }`}</div>;

const generateMoleArray = () => ( new Array( NUMBER_OF_MOLES ).fill().map(
    () => ( {
        points: MOLE_SCORE,
        delay: gsap.utils.random( 0.5, 1 ),
        speed: gsap.utils.random( 0.5, 1 )
    } ) ) );


function App() {

    const [ isPlaying, setIsPlaying ] = useState( false );
    const [ score, setScore ] = useState( 0 );
    const [ finished, setFinished ] = useState( false );
    const [ moles, setMoles ] = useState( generateMoleArray() );
    const [ highScore, setHighScore ] = usePersistenceState( "whac-high-score", 0 );
    // const { play: playSquek } = useAudio();

    const startGame = () => {
        setScore( 0 );
        setMoles( generateMoleArray() );
        setIsPlaying( true );
        setFinished( false );
    }

    const endGame = () => {
        if ( score > highScore ) setHighScore( score )
        setIsPlaying( false );
        setFinished( true );
    }

    const onWhack = points => {
        // playSquek()
        setScore( score + points )
    }



    return (
        <>

            {
                !isPlaying && !finished ?
                    <>
                        <h1>Whack A Mole</h1>
                        <Score text="High Score" value={highScore} />
                        <button onClick={startGame}>Start Game</button>
                    </> : null
            }

            {
                isPlaying ? <>
                    <button
                        className="end-game"
                        onClick={endGame}
                    >
                        End Game
                    </button>
                    <Score text="Score" value={score} />
                    <Timer
                        time={TIME_LIMIT}
                        onEnd={endGame}
                    />
                    <Moles>
                        {
                            moles.map(
                                ( { points, speed, delay }, idx ) => <Mole
                                    key={idx}
                                    points={points}
                                    delay={delay}
                                    speed={speed}
                                    onWhack={onWhack} /> )
                        }
                    </Moles>
                </> : ""
            }
            {
                finished ?
                    <>
                        <h1>Whack A Mole</h1>
                        <Score text="High Score" value={highScore} />
                        <Score text="Score" value={score} />
                        <button onClick={startGame}>Play Again</button>

                    </> : null
            }

        </>
    )
}

render( <App />, document.getElementById( "root" ) );
