#!/usr/bin/env node
'use strict';

var _findMatches = require('./core/findMatches');

var _findMatches2 = _interopRequireDefault(_findMatches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

run();

function run() {
    var wordsToMatchArr = readCLArguments();

    readInputLineStream().then(turnInputIntoArray).then(function (wordsDict) {
        return findAllMatches(wordsToMatchArr, wordsDict);
    }).then(outputMatches).catch(function (e) {
        return console.error(e.message, e.stack);
    });
}

// 1. Read input lines stream
function readInputLineStream() {
    return new Promise(function (resolve, reject) {
        var inputStr = '';

        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', function (data) {
            return inputStr += data;
        });
        process.stdin.on('end', function () {
            return resolve(inputStr);
        });
        process.stdin.on('error', function (err) {
            return reject(err);
        });
    });
}

// 2. Turn input lines stream into array of words
function turnInputIntoArray(str) {
    return str.replace(/\\r\\n/g, '\n') // For working in windows as well ;)
    .split('\n');
}

// 3. Read command line arguments
function readCLArguments() {
    return process.argv.slice(2);
}

// 4. For each word of the command line arguments, find matches from the input array of words
//    5.1 non-alphabetic chars must be ignored
//    5.2 comparison must NOT be case-sensitive
//    5.3 After first char all the following letters must bee ignored: A, E, I, H, O, U, W, Y
//    5.4 All the follow group of chars are considered equivalents:
//        A, E, I, O, U
//        C, G, J, K, Q, S, X, Y, Z
//        B, F, P, V, W
//        D, T
//        M, N
//        (All others has no equivalents)
//    5.5 Any consecutive occurrence of equivalent chars are considered as an unique occurrence
function findAllMatches(wordsToMatch, dict) {
    return wordsToMatch.map(function (word) {
        return { word: word, matches: (0, _findMatches2.default)(word, dict) };
    }).filter(function (item) {
        return item.matches.length > 0;
    });
}

// 5. Output all matches in the following format:
// wordFromCl: all, the, matched, word, from, input, stream
function outputMatches(matches) {
    if (matches.length === 0) {
        return console.error('No matches found!');
    }

    matches.forEach(function (match) {
        return console.log(match.word + ': ' + match.matches.join(','));
    });
}