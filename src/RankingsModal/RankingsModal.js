import React, { useState, useEffect } from 'react';
import './RankingsModal.css';
import { levels } from '../utilities';

function RankingsModal({ score, rankings, showRankings, setShowRankings }) {

    const reversedRankings = [...rankings].reverse().slice(1);
    const reversedLevels = [...levels].reverse().slice(1);

    const [rankingIndex, setRankingIndex] = useState(0);

    useEffect(() => {
        const maxScore = rankings[rankings.length - 1];
        for (let i = 0; i < levels.length; i++) {
            if (score < levels[i].percentage * maxScore / 100) {
                break;
            }
            setRankingIndex(i);
        }
    }, [score, rankings]);

    function displayRankingBall(i) {
        if (i === 8) {
            return rankingIndex === 8 ? <div className='bg-yellow-400 w-8 h-8 text-xs text-center leading-8'>
                {score}
            </div> : <div className='bg-gray-300 w-[8px] h-[8px]'></div>
        } else if (i === rankingIndex) {
            return (
                <div className='relative'>
                    <div className='absolute rounded-l-full rounded-r-full top-[-10px] left-[-15px] w-[342px] h-[40px] bg-yellow-400 py-1 text-xs'></div>
                    <div className='relative z-10 mb-[4px] text-base leading-5 font-bold'>{score}</div>
                </div>
            )
        } else if (i < rankingIndex) {
            return <div className='rounded-full bg-yellow-400 w-[8px] h-[8px]'></div>
        } else {
            return <div className='rounded-full bg-gray-300 w-[8px] h-[8px]'></div>
        }
    }

    function displayLabel(level, i) {
        if (reversedRankings.length - 1 - i === rankingIndex) {
            return (
                <div key={i} className='z-10 py-2 text-base font-bold mb-2'>
                    {level.label}
                    <span key={i} className='z-10 py-1 pl-2 text-xs mb-2 font-normal'>{reversedRankings[i-1] - score} points to {reversedLevels[i-1].label}</span>
                </div>

            )
        } else {
            return <div key={i} className='text-base mb-2'>{level.label}</div>
        }
    }

    function displayScore(ranking, i) {
        if (reversedRankings.length - 1 - i === rankingIndex) {
            return <div key={i} className='z-10 py-2 rounded-r-full text-base text-right mb-2'>{ranking}</div>
        } else {
            return <div key={i} className='text-base text-right mb-2'>{ranking}</div>
        }
    }

    return (
        <div className={`modalContainer ${showRankings ? 'show' : ''}`}>
            <div className='h-[50px]'></div>
            <div className={`rounded rankingsModal w-full sm:w-[360px] ${showRankings ? 'show' : ''}`}>
                <div className='float-right m-1 closeButton' onClick={() => setShowRankings(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className='text-2xl font-semibold mt-8 mx-8'>Rankings</div>
                <div className='text-base mx-8'>Ranks are based on a percentage of possible points in a puzzle</div>
                <div className='flex justify-evenly mt-8 mx-auto w-[310px]'>
                    <div className='flex flex-col mt-[29px]'>
                        {reversedRankings.map((_, i) => (
                            <div key={i} className='flex flex-col items-center'>
                                <div>{displayRankingBall(reversedRankings.length - 1 - i)}</div>
                                <div>{i !== reversedRankings.length - 1 && <div className='h-[24px] w-[1px] border-b bg-gray-300'></div>}</div>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-grow flex-col ml-4'>
                        <div className='text-xs font-bold mb-1'>Rank</div>
                        {reversedLevels.map((level, i) => (
                            displayLabel(level, i)
                        ))}
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-xs font-bold mb-1'>Score</div>
                        {reversedRankings.map((ranking, i) => (
                            displayScore(ranking, i)
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RankingsModal;