#!/usr/bin/env node
import {
    readCLArguments,
    readInputLineStream,
    turnInputIntoArray,
    outputMatches
} from './core/utils';
import {findAllMatches} from './core/search';

/**
 * Runs the command logic
 *
 * return {void}
 */
function run() {
    const wordsToMatchArr = readCLArguments();

    readInputLineStream()
        .then(turnInputIntoArray)
        .then(wordsDict => findAllMatches(wordsToMatchArr, wordsDict))
        .then(outputMatches)
        .catch(e => console.error(e.message, e.stack));
}

run();
