#!/usr/bin/env node
import findMatches from './core/findMatches';

run();

function run() {
    const wordsToMatchArr = readCLArguments();

    readInputLineStream()
        .then(turnInputIntoArray)
        .then(wordsDict => findAllMatches(wordsToMatchArr, wordsDict))
        .then(outputMatches)
        .catch(e => console.error(e.message, e.stack));
}

// 1. Read input lines stream
function readInputLineStream() {
    return new Promise((resolve, reject) => {
        let inputStr = '';

        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', data => inputStr += data);
        process.stdin.on('end', () => resolve(inputStr));
        process.stdin.on('error', err => reject(err));
    });
}

// 2. Turn input lines stream into array of words
function turnInputIntoArray(str) {
    return str
        .replace(/\\r\\n/g, '\n') // For working in windows as well ;)
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
    return wordsToMatch
        .map(word => ({word, matches: findMatches(word, dict)}))
        .filter(item => item.matches.length > 0);
}

// 5. Output all matches in the following format:
// wordFromCl: all, the, matched, word, from, input, stream
function outputMatches(matches) {
    if (matches.length === 0) {
        return console.error('No matches found!');
    }

    matches.forEach(match => console.log(`${match.word}: ${match.matches.join(',')}`));
}
