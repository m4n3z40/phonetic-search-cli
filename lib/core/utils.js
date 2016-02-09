'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readInputLineStream = readInputLineStream;
exports.turnInputIntoArray = turnInputIntoArray;
exports.readCLArguments = readCLArguments;
exports.outputMatches = outputMatches;
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

function turnInputIntoArray(str) {
    return str.replace(/\\r\\n/g, '\n') // For working in windows as well ;)
    .split('\n');
}

function readCLArguments() {
    return process.argv.slice(2);
}

function outputMatches(matches) {
    if (matches.length === 0) {
        return console.error('No matches found!');
    }

    matches.forEach(function (match) {
        return console.log(match.word + ': ' + match.matches.join(', '));
    });
}