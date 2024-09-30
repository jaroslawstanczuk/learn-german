import React from 'react';

interface SolveProps {
    phrase: string;
}

interface PartProps {
    word: string;
}

const Puzzle = ({ word }: { word: string }) => {
    return(
        <div className="solve">
            <Solve phrase={word} />
        </div>
    )
}

const Solve: React.FC<SolveProps> = ({ phrase }) => {
    const words = phrase.split(' ');

    return words.map((word, i) => (
        <div className="word" key={i}>
            <Word word={word} />
        </div>
    ));
}

const Word: React.FC<PartProps> = ({ word }) => {
    const letters = [];

    for (let i = 0; i < word.length; i++){
        letters.push(<div className="letter" key={i}></div>)
    };

    return letters;
}

export default Puzzle;