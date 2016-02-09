'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = findMatches;
var MIN_MATCHES = 3;

function findMatches(word, dict) {
    var wordToMatch = formatWord(word);

    return dict.map(function (dictWord) {
        return wordMatches(wordToMatch, formatWord(dictWord)) ? dictWord : null;
    }).filter(function (w) {
        return w !== null;
    });
}

function wordMatches(wordA, wordB) {
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