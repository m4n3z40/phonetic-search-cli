'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = findMatches;
function findMatches(word, dict) {
    var wordToMatch = formatWord(word);

    var matches = dict.map(function (dictWord) {
        return wordMatches(wordToMatch, formatWord(dictWord)) ? dictWord : null;
    }).filter(function (w) {
        return w !== null;
    });

    return matches.length === 0 ? null : matches;
}

function wordMatches(wordA, wordB) {
    var MIN_MATCHES = 3;
    var matches = 0;

    for (var i = 0, length = wordA.length; i < length; i++) {
        if (wordA[i] === wordB[i]) {
            matches++;
        }

        if (matches >= MIN_MATCHES) {
            return true;
        }
    }
}

function formatWord(word) {
    var fWord = stripAllNonAlpha(word);

    return ignoreCase(fWord);
}

function stripAllNonAlpha(word) {
    return word.replace(/[^a-z]/gi, '');
}

function ignoreCase(word) {
    return word.toLowerCase();
}