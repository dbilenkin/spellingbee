import React, { useState, useEffect } from 'react';
import './App.css';
import spellingBeeWords from './spellingBeeWords';
import Rankings from './Rankings';
import RankingsModal from './RankingsModal/RankingsModal';
import GuessedWords from './GuessedWords/GuessedWords';
import { isPangram } from './utilities';
import Answers from './Answers/Answers';
import GeniusModal from './GeniusModal/GeniusModal';

function App() {
  const [special, setSpecial] = useState("");
  const [letters, setLetters] = useState([]);
  const [words, setWords] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [gameId, setGameId] = useState(0);

  const [guess, setGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [alert, setAlert] = useState("");
  const [score, setScore] = useState(0);

  const [showRankings, setShowRankings] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showGenius, setShowGenius] = useState(false);

  useEffect(() => {
    let gameIdFromPath = parseInt(window.location.pathname.split("/")[2]);
    let gameIdFromStorage = parseInt(localStorage.gameId);

    if (gameIdFromPath && gameIdFromPath === gameIdFromStorage) {
      getFromStorage()
    } else {
      initNewGame();
    }
  }, []);

  function initNewGame() {

    let _gameId = parseInt(window.location.pathname.split("/")[2]);
    if (!_gameId) {
      _gameId = Math.floor(Math.random() * spellingBeeWords.length);
      window.history.replaceState(null, "", "/spellingbee/" + _gameId);
    }

    const game = spellingBeeWords[_gameId];

    const _special = game.special;
    const _letters = game.letters.split("").filter(letter => letter !== _special);
    const _words = game.words;
    const _rankings = game.rankings;

    setSpecial(_special);
    setLetters(_letters);
    setWords(_words);
    setRankings(_rankings);
    setGameId(_gameId)

    setScore(0);
    setGuess("");
    setGuessedWords([]);
    setAlert("");

    saveToStorage(_special, _letters, _words, _rankings, _gameId);
  }

  function getFromStorage() {
    setSpecial(localStorage.special);
    setLetters(JSON.parse(localStorage.letters));
    setWords(JSON.parse(localStorage.words));
    setRankings(JSON.parse(localStorage.rankings));
    setGameId(parseInt(localStorage.gameId));
    setScore(parseInt(localStorage.score));

    if (localStorage.guessedWords) {
      setGuessedWords(JSON.parse(localStorage.guessedWords));
    }
  }

  function saveToStorage(special, letters, words, rankings, gameId) {
    localStorage.special = special;
    localStorage.letters = JSON.stringify(letters);
    localStorage.words = JSON.stringify(words);
    localStorage.rankings = JSON.stringify(rankings);
    localStorage.gameId = gameId;
  }

  function newGame() {
    localStorage.removeItem("special");
    localStorage.removeItem("letters");
    localStorage.removeItem("words");
    localStorage.removeItem("guessedWords");
    localStorage.removeItem("score");
    localStorage.removeItem("gameId");

    window.history.replaceState(null, "", "/spellingbee");
    initNewGame();
  }

  function selectLetter(event) {
    const selectedLetter = event.target.innerText;
    setGuess(guess + selectedLetter);
  }

  function renderGuess() {
    return guess.split("").map((letter, i) => (
      letter.toLowerCase() === special ?
        <span key={i} className='specialLetter'>{letter}</span> :
        <span key={i} className=''>{letter}</span>
    ))
  }

  function deleteLetter() {
    setGuess(guess.slice(0, guess.length - 1));
  }

  function shuffle() {
    const shuffledLetters = [];
    const free = new Set([0, 1, 2, 3, 4, 5]);
    letters.forEach((letter, i) => {
      const availableSlots = [...free].filter(n => n !== i);
      if (availableSlots.length > 0) {
        const newIndex = Math.floor(Math.random() * availableSlots.length);
        const newSlot = availableSlots[newIndex];
        shuffledLetters[newSlot] = letter;
        free.delete(newSlot);
      } else {
        shuffledLetters[i] = shuffledLetters[0];
        shuffledLetters[0] = letter;
      }
    })
    setLetters(shuffledLetters);
  }

  function enterGuess() {
    if (guess.length < 4) {
      setAlert("Too short");
    } else if (guess.indexOf(special.toUpperCase()) === -1) {
      setAlert("Missing center letter");
    } else if (!words.includes(guess.toLowerCase())) {
      setAlert("Not in word list");
    } else if (guessedWords.includes(formatGuess(guess))) {
      setAlert("Already found");
    } else {
      const newGuessedWords = [...guessedWords];
      let scoreForWord = guess.length === 4 ? 1 : guess.length;
      const pangram = isPangram(guess, letters);
      scoreForWord += pangram ? 7 : 0;
      const newScore = score + scoreForWord;
      setScore(newScore);
      localStorage.score = newScore;

      const geniusScore = rankings[rankings.length - 2];
      if (score < geniusScore && newScore >= geniusScore) {
        setShowGenius(true);
      } else{
        if (scoreForWord === 1) {
          setAlert("Good! +" + scoreForWord);
        } else if (scoreForWord < 7) {
          setAlert("Nice! +" + scoreForWord);
        } else {
          if (pangram) {
            setAlert("Pangram! +" + scoreForWord);
          } else {
            setAlert("Awesome! +" + scoreForWord);
          }
        }
      }

      newGuessedWords.unshift(formatGuess(guess));
      setGuessedWords(newGuessedWords);
      localStorage.guessedWords = JSON.stringify(newGuessedWords);
    }
    setGuess("");
    setTimeout(() => setAlert(""), 2000);
  }

  function formatGuess(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='ml-3'>Spelling Bee</div>
        <div className='flex'>
          <div className='cursor-pointer text-base mr-3' onClick={newGame}>New Game</div>
          <div className='cursor-pointer text-base mr-3' onClick={() => setShowRankings(true)}>Rankings</div>
          <div className='cursor-pointer text-base mr-3' onClick={() => setShowAnswers(true)}>Answers</div>

        </div>
      </header>
      <div className='content'>
        <GeniusModal score={score} guessedWords={guessedWords} showGenius={showGenius} setShowGenius={setShowGenius} newGame={newGame}/>
        <RankingsModal score={score} rankings={rankings} showRankings={showRankings} setShowRankings={setShowRankings} />
        <Answers guessedWords={guessedWords} words={words} special={special} letters={letters} showAnswers={showAnswers} setShowAnswers={setShowAnswers} />
        <Rankings score={score} rankings={rankings} />
        <GuessedWords guessedWords={guessedWords} />
        <div className={`rounded justify-self-center h-8 py-1 px-2 mt-[60px] bg-black text-white alert ${alert ? 'show' : ''} ${alert.indexOf('!') !== -1 ? 'nice' : ''}`}>{alert}</div>
        <div className="guess">{renderGuess()}</div>
        <div className="letters">
          <div className='special letter' onClick={e => selectLetter(e)}>{special.toUpperCase()}</div>
          {letters.map((letter, i) => (
            (<div id={`letter${i}`} className='letter' key={letter} onClick={e => selectLetter(e)}>{letter.toUpperCase()}</div>)
          ))}
        </div>
        <div className='buttons'>
          <button className="btn w-[90px] h-[50px]" onClick={deleteLetter}>
            Delete
          </button>
          <button className="btn refreshButton" onClick={shuffle}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
          <button className="btn w-[90px] h-[50px]" onClick={enterGuess}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
