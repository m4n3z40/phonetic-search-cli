/**
 * Reads the input stream and turns into a Promise
 *
 * @returns {Promise} resolves when input stream ends or rejects it there's an error
 */
export function readInputLineStream() {
    return new Promise((resolve, reject) => {
        let inputStr = '';

        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', data => inputStr += data);
        process.stdin.on('end', () => resolve(inputStr));
        process.stdin.on('error', err => reject(err));
    });
}

/**
 * Turns input resulting text into a array of lines
 *
 * @param {string} str the resulting string
 * @returns {Array} an array containing each line as an array item
 */
export function turnInputIntoArray(str) {
    return str
        .replace(/\\r\\n/g, '\n') // For working in windows as well ;)
        .split('\n');
}

/**
 * Returns the command line arguments as an array of strings
 *
 * @returns {Array} an array of string arguments
 */
export function readCLArguments() {
    return process.argv.slice(2);
}


/**
 * Outputs the resulting matches to the terminal console
 *
 * @param {Array} matches the resulting matches from the phonetics processing
 * @returns {void}
 */
export function outputMatches(matches) {
    if (matches.length === 0) {
        return console.error('No matches found!');
    }

    matches.forEach(match => console.log(`${match.word}: ${match.matches.join(', ')}`));
}
