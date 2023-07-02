export function isPangram(word, letters) {
    for (let letter of letters) {
        if (word.indexOf(letter.toUpperCase()) === -1) {
            return false;
        }
    }
    return true;
}