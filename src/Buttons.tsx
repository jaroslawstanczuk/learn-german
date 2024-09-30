import React from 'react';
import './Buttons.css';

export default function Buttons({ guess, setGuess }: { guess: string, setGuess: any }){
    const keys = ['ä', 'ö', 'ü', 'ß'];

    return (
        <div className="buttons">
            {keys.map(key => (
                <Key
                    letter={key}
                    key={key}
                    guess={guess}
                    setGuess={setGuess}
                />
            ))}
        </div>
    )
}

function Key({ letter, guess, setGuess }: { letter: string, guess: string, setGuess: any }) {
    
    const handleClick = () => {
        setGuess(guess + letter);
    }

    return (
        <div onClick={handleClick} className="key">
            <div>{letter}</div>
        </div>
    );
}