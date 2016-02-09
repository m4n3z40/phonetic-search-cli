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

export function turnInputIntoArray(str) {
    return str
        .replace(/\\r\\n/g, '\n') // For working in windows as well ;)
        .split('\n');
}

export function readCLArguments() {
    return process.argv.slice(2);
}


export function outputMatches(matches) {
    if (matches.length === 0) {
        return console.error('No matches found!');
    }

    matches.forEach(match => console.log(`${match.word}: ${match.matches.join(', ')}`));
}
