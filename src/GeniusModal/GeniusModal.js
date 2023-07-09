import React from 'react';
import './GeniusModal.css';
import bee from './bee.jpg';

function GeniusModal({ score, guessedWords, showGenius, setShowGenius, newGame }) {

    function newGameAndClose() {
        newGame();
        setShowGenius(false);
    }

    return (
        <div className={`modalContainer ${showGenius ? 'show' : ''}`}>
            <div className='h-[50px]'></div>
            <div className={`rounded answersModal w-full sm:w-[360px] ${showGenius ? 'show' : ''}`}>
                <div className='rounded justify-self-center h-full border p-2 openAnswerBox'>
                    <div className='float-right m-1 closeButton' onClick={() => setShowGenius(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className='w-[120px] mx-auto mt-10'>
                        <img src={bee} alt="Bee" />
                    </div>
                    <div className='text-4xl text-center font-black mt-4 mx-8'>
                        Genius
                    </div>
                    <div className='text-xl text-center mt-8 mx-8'>
                        You reached the highest rank, with
                        <span className='font-bold'> {guessedWords.length} words </span> and
                        <span className='font-bold'> {score} points.</span>
                    </div>
                    <div className='buttons mt-4'>
                        <button className="btn w-[140px] h-[50px] mr-2" onClick={newGameAndClose}>
                            New Game
                        </button>
                        <button className="btn btn-black w-[140px] h-[50px] ml-2" onClick={() => setShowGenius(false)}>
                            Keep Playing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeniusModal;