import React, { useState, useEffect } from 'react';
import './App.css';

const WORDS_URL = '../data/words.json';

interface WordProps {
    word: string;
    translation: string;
}

interface SolveProps {
    phrase: string;
}

interface PartProps {
    word: string;
}

type WordArray = WordProps[];

const App: React.FC = () => {
    const [words, setWords] = useState<WordArray>([]);
    const [randomWordIdx, setRandomWordIdx] = useState<number>(0);
    const [guess, setGuess] = useState('');

    useEffect(() => {
        const fetchWords = async () => {
            const res = await fetch(WORDS_URL);
            const data = await res.json();
            // console.log(data);
            setWords(data.dict);
        }

        fetchWords();
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', e => {
            const key = e.key;
            if (key === ' ') return;
            if (key === 'Backspace') setGuess(currentGuess => currentGuess.slice(0, -1));
            if (key.length > 1) return;
            setGuess(currentGuess => currentGuess + e.key.toUpperCase());
        });
    }, []);

    useEffect(() => {
        if (words.length === 0) return;
        const noSpaceWord = words[randomWordIdx].word.replaceAll(' ', '').toUpperCase();
        const letters = document.querySelectorAll('.letter');
        for (let i = 0; i < letters.length; i++){
            // console.log(`guess: ${guess[i]}\nnoSpaceWord: ${noSpaceWord[i]}`);
            letters[i].textContent = guess[i] ?? '';
            if(guess[i] === noSpaceWord[i]){
                letters[i].classList.add('correct');
            } else {
                letters[i].classList.remove('correct');
            }
        }
    }, [guess]);

    useEffect(() => {
        const randomIdx = Math.floor(Math.random() * words.length);
        setRandomWordIdx(randomIdx);
    }, [words])

    return (
        <div className="content">
            <div>
                {words.length > 0 && words[randomWordIdx].translation}
            </div>
            <div className="solve">
                {words.length > 0 && <Solve phrase={words[randomWordIdx].word} />}
            </div>
            <div className="guess">
                {/* {guess}     */}
            </div>   
        </div>

    )
};

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

export default App;