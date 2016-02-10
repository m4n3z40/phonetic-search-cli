'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readInputLineStream = readInputLineStream;
exports.turnInputIntoArray = turnInputIntoArray;
exports.readCLArguments = readCLArguments;
exports.outputMatches = outputMatches;
/**
 * Reads the input stream and turns into a Promise
 *
 * @returns {Promise} resolves when input stream ends or rejects it there's an error
 */
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

/**
 * Turns input resulting text into a array of lines
 *
 * @param {string} str the resulting string
 * @returns {Array} an array containing each line as an array item
 */
function turnInputIntoArray(str) {
    return str.replace(/\\r\\n/g, '\n') // For working in windows as well ;)
    .split('\n');
}

/**
 * Returns the command line arguments as an array of strings
 *
 * @returns {Array} an array of string arguments
 */
function readCLArguments() {
    return process.argv.slice(2);
}

/**
 * Outputs the resulting matches to the terminal console
 *
 * @param {Array} matches the resulting matches from the phonetics processing
 * @returns {void}
 */
function outputMatches(matches) {
    if (matches.length === 0) {
        return console.error('No matches found!');
    }

    matches.forEach(function (match) {
        return console.log(match.word + ': ' + match.matches.join(', '));
    });
}