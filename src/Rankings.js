import React, { useState, useEffect } from 'react';
import { levels } from './utilities';

function Rankings({ score, rankings }) {

    const [ranking, setRanking] = useState("Beginner");
    const [rankingIndex, setRankingIndex] = useState(0);

    useEffect(() => {
        let _ranking;
        const maxScore = rankings[rankings.length - 1];
        for (let i = 0; i < levels.length; i++) {
            if (score < levels[i].percentage * maxScore / 100) {
                break;
            }
            _ranking = levels[i].label;
            setRankingIndex(i);
        }
        setRanking(_ranking);
    }, [score, rankings]);

    function getRankingBall(i) {
        if (i === 8) {
            return rankingIndex === 8 ? <div className='bg-yellow-400 w-8 h-8 text-xs text-center leading-8'>
                {score}
            </div> : <div className='bg-gray-300 w-[8px] h-[8px]'></div>
        } else if (i === rankingIndex) {
            return <div className='rounded-full bg-yellow-400 w-8 h-8 text-xs text-center leading-8'>{score}</div>
        } else if (i < rankingIndex) {
            return <div className='rounded-full bg-yellow-400 w-[8px] h-[8px]'></div>
        } else {
            return <div className='rounded-full bg-gray-300 w-[8px] h-[8px]'></div>
        }
            
    }

    return (
        <div className='w-[360px] m-2 scoreBox justify-self-center flex justify-between items-center'>
            <div className='font-bold'>{ranking}</div>
            <div className='flex'>
                {rankings.slice(0, -1).map((_, i) => (
                    <div key={i} className='flex items-center'>
                        <div>{getRankingBall(i)}</div>
                        <div>{i !== rankings.length - 2 && <div className='w-[20px] border-b bg-gray-300'></div>}</div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Rankings;




