export function isPangram(word) {
    const letterSet = new Set(word.toLowerCase().split(""));
    return letterSet.size === 7;
}

export function capitalize(word) {
    return word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase();
}

export const levels = [
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