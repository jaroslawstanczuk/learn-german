import React from 'react';
import './Gameover.css';

export default function Gameover({ fetchWords }: {fetchWords: any}){
    const handleClick = () => {
        fetchWords();
    }

    return (
        <div className="gameover">
            <div>
                <h3>Congrats! You finished all phrases.</h3>
                <p>Go forth and use them in conversations.</p>
            </div>
            <p>Or practice some more if you like.</p>
            <button onClick={handleClick}>Start over</button>
        </div>
    )
}