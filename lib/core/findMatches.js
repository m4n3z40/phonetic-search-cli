'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = findMatches;
var MIN_MATCHES = 2;
var INVALID_SECOND_CHARS = ['a', 'e', 'i', 'h', 'o', 'u', 'w', 'y'];
var EQUIVALENT_GROUPS = [['a', 'e', 'i', 'o', 'u'], ['c', 'g', 'j', 'k', 'q', 's', 'x', 'y', 'z'], ['b', 'f', 'p', 'v', 'w'], ['d', 't'], ['m', 'n']];

function findMatches(word, dict) {
    var wordToMatch = normalizeWord(word);

    return dict.map(function (dictWord) {
        return wordMatches(wordToMatch, normalizeWord(dictWord)) ? dictWord : null;
    }).filter(function (w) {
        return w !== null;
    });
}

function wordMatches(wordA, wordB) {
    var matches = 0;

    for (var i = 0, length = wordA.length; i < length; i++) {
        if (isEquivalentChar(wordA[i], wordB[i])) {
            matches++;
        }

        if (matches >= MIN_MATCHES) {
            return true;
        }
    }

    return false;
}

function normalizeWord(word) {
    var nWord = word.replace(/[^a-z]/gi, '').toLowerCase();

    nWord = discardInvalidSecondChar(nWord);
    nWord = discardConsecutiveEquivalents(nWord);

    return nWord;
}

function discardInvalidSecondChar(word) {
    if (INVALID_SECOND_CHARS.indexOf(word[1]) >= 0) {
        return discardInvalidSecondChar(word[0] + word.slice(2));
    }

    return word;
}

function discardConsecutiveEquivalents(word) {
    var realWord = word[0];

    for (var i = 1, length = word.length; i < length; i++) {
        if (!isEquivalentChar(word[i - 1], word[i])) {
            realWord += word[i];
        }
    }

    return realWord;
}

function isEquivalentChar(charA, charB) {
    var matchGroup = undefined;

    if (charA === charB) {
        return true;
    }

    EQUIVALENT_GROUPS.some(function (group) {
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