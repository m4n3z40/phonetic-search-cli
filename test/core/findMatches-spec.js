import findMatches from '../../src/core/findMatches';

describe('findMatches function', () => {
    it('ignores all non-alphabetic characters', () => {
        const words = ['1all', '1ton#', 'catch-a'];
        const dict = ['all', 'ton', 'catch'];

        words.forEach((word, i) => {
            const matches = findMatches(word, dict);

            expect(matches[0]).toEqual(dict[i]);
        });
    });

    it('is not case sensitive', () => {
        const words = ['ALL', '1ton#', 'CATCH1'];
        const dict = ['all', 'TON', 'caTCH'];

        words.forEach((word, i) => {
            const matches = findMatches(word, dict);

            expect(matches[0]).toEqual(dict[i]);
        });
    });

    it('ignores A, E, I, H, O, U, W, Y after first char', () => {

    });

    it(
        'Treats following groups as equivalents: ' +
        '{A, E, I, O, U} {C, G, J, K, Q, S, X, Y, Z} {B, F, P, V, W} {D, T} {M, N}',
        () => {

        }
    );

    it('Ignores consecutive occurrences of the same match', () => {

    });

    it('passes against a sample dict and words', () => {
        const wordsDict = ['angel', 'brave', 'Braev', 'Don', 'Engel', 'go', 'goal', 'son', 'sunny', 'Tom', 'Tooonnnnyyyy'];
        const expectedResults = {
            '1ton#': ['Don', 'Tom', 'Tooonnnnyyyy'],
            'brief': ['brave', 'Braev'],
            'soon': ['son', 'sunny']
        };
    });
});
