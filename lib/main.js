#!/usr/bin/env node
'use strict';

var _utils = require('./core/utils');

var _search = require('./core/search');

/**
 * Runs the command logic
 *
 * return {void}
 */
function run() {
    var wordsToMatchArr = (0, _utils.readCLArguments)();

    (0, _utils.readInputLineStream)().then(_utils.turnInputIntoArray).then(function (wordsDict) {
        return (0, _search.findAllMatches)(wordsToMatchArr, wordsDict);
    }).then(_utils.outputMatches).catch(function (e) {
        return console.error(e.message, e.stack);
    });
}

run();