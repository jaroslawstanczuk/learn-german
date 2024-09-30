import React, { useState, useEffect } from 'react';
import './App.css';
import Puzzle from './Puzzle';
import Header from './Header';
import Buttons from './Buttons';
import Gameover from './Gameover';

const WORDS_URL = '../data/words.json';

interface WordProps {
    word: string;
    translation: string;
}

type WordArray = WordProps[];

const App: React.FC = () => {
    const [words, setWords] = useState<WordArray>([]);
    const [randomWordIdx, setRandomWordIdx] = useState<number>(0);
    const [guess, setGuess] = useState('');
    const [wordFinished, setWordFinished] = useState<boolean>(false);
    const [counter, setCounter] = useState(0);

    const fetchWords = async () => {
        const res = await fetch(WORDS_URL);
        const data = await res.json();
        setWords(data.dict);
    }

    useEffect(() => {
        fetchWords();
    }, []);

    useEffect(() => {
        // loadNewPuzzle(words);
        const randomIdx = Math.floor(Math.random() * words.length);
        console.log(`${randomIdx} of ${words.length}`);
        setRandomWordIdx(randomIdx);
        setGuess('');
        console.log(words);
    }, [words]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            if (key === 'Enter' && wordFinished){
                const newWords = words.filter((_, idx) => idx !== randomWordIdx);
                setWords(newWords);
                // loadNewPuzzle();
                setCounter(counter + 1);
            }
            if (key === ' ') return;
            if (key === 'Backspace') {
                setGuess(currentGuess => currentGuess.slice(0, -1));
                return;
            }
            if (wordFinished === true) {  
                return;
            }

            if (key.length > 1) return;
            setGuess(currentGuess => currentGuess + e.key.toLowerCase());
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [wordFinished]);

    useEffect(() => {
        if (words.length === 0) return;
        const noSpaceWord = words[randomWordIdx].word.replaceAll(' ', '').toLowerCase();
        const letters = document.querySelectorAll('.letter');
        for (let i = 0; i < letters.length; i++){
            letters[i].textContent = guess[i] ?? '';
            if(guess[i] === noSpaceWord[i]){
                letters[i].classList.add('correct');
            } else {
                letters[i].classList.remove('correct');
            }
        }

        if (guess.length >= noSpaceWord.length){
            setWordFinished(true);
        } else {
            setWordFinished(false);
        }
    }, [guess]);

    const loadNewPuzzle = (bank: WordArray) => {
        const randomIdx = Math.floor(Math.random() * bank.length);
        console.log(`${randomIdx} of ${bank.length}`);
        setRandomWordIdx(randomIdx);
        setGuess('');
    }

    return (
        <div className="app">
            <Header />
            <div className="main">
                {words.length > 0 && words[randomWordIdx] &&
                    <div className="content">
                        <div>Answers: {counter}</div>
                        <h2>{words[randomWordIdx].translation}</h2>
                        <Puzzle word={words[randomWordIdx].word} />
                        <Buttons guess={guess} setGuess={setGuess} />
                    </div>
                }
                {words.length === 0 && <Gameover fetchWords={fetchWords} />}
                {/* <Gameover /> */}
            </div>
        </div>

    )
};

export default App;