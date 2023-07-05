import React from 'react';
import './Answers.css';
import { isPangram, capitalize } from '../utilities';

function Answers({ guessedWords, words, special, letters, showAnswers, setShowAnswers }) {

    function displayWord(word, i) {
        return (
            <div
                key={i}
                className={`border-b border-gray-300 m-2 ${isPangram(word) ? 'font-bold' : ''}`}>
                {guessedWords.includes(capitalize(word)) ?
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#FFD700" className="inline mb-[6px] w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </span> :
                    <span className='inline-block w-6 h-6'></span>
                } <span className={isPangram(word) ? 'font-bold' : ''}>{capitalize(word)}</span>
            </div>
        )
    }

    function displayOpenWords() {
        const sortedWords = [...words];
        sortedWords.sort();
        const halfWayIndex = Math.ceil(sortedWords.length / 2);
        return (
            <div className='flex overflow-auto h-[80vh]'>
                <div className='w-1/2'>{sortedWords.slice(0, halfWayIndex).map((word, i) => displayWord(word, i))}</div>
                <div className='w-1/2'>{sortedWords.slice(halfWayIndex).map((word, i) => displayWord(word, i))}</div>
            </div>)
    }

    return (
        <div className={`modalContainer ${showAnswers ? 'show' : ''}`}>
            <div className='h-[50px]'></div>
            <div className={`rounded answersModal w-full sm:w-[360px] ${showAnswers ? 'show' : ''}`}>
                <div className='rounded justify-self-center h-full border p-2 openAnswerBox'>
                    <div className='float-right m-1 closeButton' onClick={() => setShowAnswers(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className='text-2xl font-semibold mt-8 mx-8'>
                        Answers
                        <span className='text-xl mx-8 font-bold'>
                            <span className='text-yellow-400'>{special.toUpperCase()}</span>
                            {letters.map(letter => <span className='pl-2'>{letter.toUpperCase()}</span>)}
                        </span>
                    </div>

                    <div className='mb-2 mx-8'>You found {guessedWords.length} out of {words.length} words</div>
                    {displayOpenWords()}
                </div>
            </div>
        </div>
    )
}

export default Answers;