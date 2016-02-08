const MIN_MATCHES = 3;

export default function findMatches(word, dict) {
    const wordToMatch = formatWord(word);

    const matches = dict
        .map(dictWord => wordMatches(wordToMatch, formatWord(dictWord)) ? dictWord : null)
        .filter(w => w !== null);

    return matches.length === 0 ? null : matches;
}

function wordMatches(wordA, wordB) {
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
    const fWord = stripAllNonAlpha(word);

    return ignoreCase(fWord);
}

function stripAllNonAlpha(word) {
    return word.replace(/[^a-z]/gi, '');
}

function ignoreCase(word) {
    return word.toLowerCase();
}
