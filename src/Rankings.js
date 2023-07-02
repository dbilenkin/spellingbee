import React, { useState, useEffect } from 'react';
import { isPangram } from './utilities';

const levels = [
    {
        percentage: 0,
        label: "Beginner"
    },
    {
        percentage: 2,
        label: "Good Start"
    },
    {
        percentage: 5,
        label: "Moving Up"
    },
    {
        percentage: 8,
        label: "Good"
    },
    {
        percentage: 15,
        label: "Solid"
    },
    {
        percentage: 25,
        label: "Nice"
    },
    {
        percentage: 40,
        label: "Great"
    },
    {
        percentage: 50,
        label: "Amazing"
    },
    {
        percentage: 70,
        label: "Genius"
    },
    {
        percentage: 100,
        label: "Queen Bee"
    }
];

function Rankings({ score, words, letters }) {

    const [rankings, setRankings] = useState([]);
    const [maxScore, setMaxScore] = useState(0);
    const [ranking, setRanking] = useState("Beginner");
    const [rankingIndex, setRankingIndex] = useState(0);

    useEffect(() => {
        const _maxScore = words.reduce((prev, word) => {
            let score = word.length === 4 ? 1 : word.length;
            score += isPangram(word, letters) ? 7 : 0;
            return prev + score;
        }, 0);
        const _rankings = levels.map(level => Math.ceil(level.percentage * _maxScore / 100));

        setMaxScore(_maxScore);
        setRankings(_rankings);
    }, [words]);

    useEffect(() => {
        let _ranking;
        for (let i = 0; i < levels.length; i++) {
            if (score < levels[i].percentage * maxScore / 100) {
                break;
            }
            _ranking = levels[i].label;
            setRankingIndex(i);
        }
        setRanking(_ranking);
    }, [score, maxScore]);

    function getRankingBall(i) {
        if (i === 8) {
            return <div className='bg-yellow-400 w-8 h-8 text-xs text-center leading-8'>
                {rankingIndex === 8 ? score : ''}
            </div>
        }
        return i === rankingIndex ?
            <div className='rounded-full bg-yellow-400 w-8 h-8 text-xs text-center leading-8'>{score}</div> :
            <div className='rounded-full bg-yellow-400 w-[5px] h-[5px]'></div>
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




