export default function findMatches(word, dict) {
    const wordToMatch = formatWord(word);

    const matches = dict
        .map(dictWord => wordMatches(wordToMatch, formatWord(dictWord)) ? dictWord : null)
        .filter(w => w !== null);

    return matches.length === 0 ? null : matches;
}

function wordMatches(wordA, wordB) {
    const MIN_MATCHES = 3;
    let matches = 0;

    for (let i = 0, length = wordA.length; i < length; i++) {
        if (wordA[i] === wordB[i]) {
            matches++;
        }

        if (matches >= MIN_MATCHES) {
            return true;
        }
    }
}

function formatWord(word) {
    return stripAllNonAlpha(word);
}

function stripAllNonAlpha(word) {
    return word.replace(/[^a-z]/gi, '');
}
