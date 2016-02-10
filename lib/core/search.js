'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findMatches = findMatches;
exports.findAllMatches = findAllMatches;
var MIN_MATCHES = 2;
var INVALID_SECOND_CHARS = ['a', 'e', 'i', 'h', 'o', 'u', 'w', 'y'];
var EQUIVALENT_GROUPS = [['a', 'e', 'i', 'o', 'u'], ['c', 'g', 'j', 'k', 'q', 's', 'x', 'y', 'z'], ['b', 'f', 'p', 'v', 'w'], ['d', 't'], ['m', 'n']];

/**
 * Returns a flag indicating if the chars being compared are equivalent
 *
 * @param {string} charA first char
 * @param {string} charB second char
 * @returns {boolean} true if they are equivalent, false if they are not
 */
function isEquivalentChar(charA, charB) {
    if (charA === charB) {
        return true;
    }

    var groups = EQUIVALENT_GROUPS;

    for (var i = 0, totalGroups = groups.length; i < totalGroups; i++) {
        if (groups[i].indexOf(charA) !== -1) {
            return groups[i].indexOf(charB) !== -1;
        }
    }

    return false;
}

/**
 * Returns a flag indicating if the words being compared are phonetically equivalent
 *
 * @param {string} wordA first word
 * @param {string} wordB second word
 * @returns {boolean} true if they are equivalent, false if they are not
 */
function wordMatches(wordA, wordB) {
    if (wordA === wordB) {
        return true;
    }

    var matches = 0;

    for (var i = 0, length = wordA.length; i < length; i++) {
        if (isEquivalentChar(wordA.charAt(i), wordB.charAt(i))) {
            matches++;
        }

        if (matches >= MIN_MATCHES) {
            return true;
        }
    }

    return false;
}

/**
 * Discard invalid second characters, recursively
 *
 * @param {string} word the word to be compared
 * @returns {string} the transformed word
 */
function discardInvalidSecondChar(word) {
    if (INVALID_SECOND_CHARS.indexOf(word.charAt(1)) !== -1) {
        return discardInvalidSecondChar(word.charAt(0) + word.slice(2));
    }

    return word;
}

/**
 * Discard all consecutive equivalents
 *
 * @param {string} word the word to be compared
 * @returns {string} the transformed word
 */
function discardConsecutiveEquivalents(word) {
    var realWord = word.charAt(0);

    for (var i = 1, length = word.length; i < length; i++) {
        if (!isEquivalentChar(word.charAt(i - 1), word.charAt(i))) {
            realWord += word.charAt(i);
        }
    }

    return realWord;
}

/**
 * Normalizes words to be compared
 *
 * @param {string} word word to be normalized
 * @returns {string} the normalized word
 */
function normalizeWord(word) {
    var nWord = word.replace(/[^a-z]/gi, '').toLowerCase();

    nWord = discardInvalidSecondChar(nWord);
    nWord = discardConsecutiveEquivalents(nWord);

    return nWord;
}

/**
 * Finds any phonetically equivalent word in a given dictionary
 *
 * @param {string} word word to be compared
 * @param {Array} dict dictionary of words to search for matches
 * @returns {Array} The array of found matches
 */
function findMatches(word, dict) {
    var wordToMatch = normalizeWord(word);

    return dict.map(function (dictWord) {
        return wordMatches(wordToMatch, normalizeWord(dictWord)) ? dictWord : null;
    }).filter(function (w) {
        return w !== null;
    });
}

/**
 * Finds any phonetically equivalent in a given dictionary for a list of words
 *
 * @param {Array} wordsToMatch list of word to be compared
 * @param {Array} dict dictionary of words to search for matches
 * @returns {Array} array of found matches for each word
 */
function findAllMatches(wordsToMatch, dict) {
    return wordsToMatch.map(function (word) {
        return { word: word, matches: findMatches(word, dict) };
    }).filter(function (item) {
        return item.matches.length > 0;
    });
}