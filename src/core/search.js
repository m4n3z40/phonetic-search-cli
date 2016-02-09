const MIN_MATCHES = 2;
const INVALID_SECOND_CHARS = ['a', 'e', 'i', 'h', 'o', 'u', 'w', 'y'];
const EQUIVALENT_GROUPS = [
    ['a', 'e', 'i', 'o', 'u'],
    ['c', 'g', 'j', 'k', 'q', 's', 'x', 'y', 'z'],
    ['b', 'f', 'p', 'v', 'w'],
    ['d', 't'],
    ['m', 'n']
];

function isEquivalentChar(charA, charB) {
    let matchGroup;

    if (charA === charB) {
        return true;
    }

    EQUIVALENT_GROUPS.some(group => {
        if (group.indexOf(charA) >= 0) {
            matchGroup = group;

            return true;
        }
    });

    if (matchGroup) {
        return matchGroup.indexOf(charB) >= 0;
    }

    return false;
}

function wordMatches(wordA, wordB) {
    let matches = 0;

    if (wordA === wordB) {
        return true;
    }

    for (let i = 0, length = wordA.length; i < length; i++) {
        if (isEquivalentChar(wordA[i], wordB[i])) {
            matches++;
        }

        if (matches >= MIN_MATCHES) {
            return true;
        }
    }

    return false;
}

function discardInvalidSecondChar(word) {
    if (INVALID_SECOND_CHARS.indexOf(word[1]) >= 0) {
        return discardInvalidSecondChar(word[0] + word.slice(2));
    }

    return word;
}

function discardConsecutiveEquivalents(word) {
    let realWord = word[0];

    for (let i = 1, length = word.length; i < length; i++) {
        if (!isEquivalentChar(word[i - 1], word[i])) {
            realWord += word[i];
        }
    }

    return realWord;
}

function normalizeWord(word) {
    let nWord = word.replace(/[^a-z]/gi, '').toLowerCase();

    nWord = discardInvalidSecondChar(nWord);
    nWord = discardConsecutiveEquivalents(nWord);

    return nWord;
}

export function findMatches(word, dict) {
    const wordToMatch = normalizeWord(word);

    return dict
        .map(dictWord => wordMatches(wordToMatch, normalizeWord(dictWord)) ? dictWord : null)
        .filter(w => w !== null);
}

export function findAllMatches(wordsToMatch, dict) {
    return wordsToMatch
        .map(word => ({word, matches: findMatches(word, dict)}))
        .filter(item => item.matches.length > 0);
}
