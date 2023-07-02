import React, { useState, useEffect } from 'react';
import './GuessedWords.css';

function GuessedWords({ guessedWords }) {

    const [collapsed, setCollapsed] = useState(true);

    function displayWord(word, i) {
        return <div key={i} className='border-b border-gray-300 m-2'>{word}</div>
    }

    function displayOpenWords() {
        guessedWords.sort();
        const halfWayIndex = Math.ceil(guessedWords.length / 2);
        return (
            <div className='flex overflow-auto h-[475px]'>
                <div className='w-1/2'>{guessedWords.slice(0, halfWayIndex).map((word, i) => displayWord(word, i))}</div>
                <div className='w-1/2'>{guessedWords.slice(halfWayIndex).map((word, i) => displayWord(word, i))}</div>
            </div>)
    }

    return (
        collapsed ? <div className='rounded justify-self-center border h-10 m-2 p-2 guessedWordsBox'>
            <span className='guessedWords'>{guessedWords.join(" ")}</span>
            <div className='cursor-pointer' onClick={() => setCollapsed(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div> :
            <div className='rounded justify-self-center border h-[300px] m-2 p-2 openWordBox'>
                <div className='relative float-right cursor-pointer' onClick={() => setCollapsed(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                </div>
                <div className='mb-2'>You have found {guessedWords.length} words</div>
                {displayOpenWords()}

            </div>
    );
}

export default GuessedWords;




