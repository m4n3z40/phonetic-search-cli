import findMatches from '../../src/core/findMatches';

describe('findMatches function', () => {
    it('ignores all non-alphabetic characters', () => {
        const words = ['1all', '1ton#', 'catch-a'];
        const dict = ['all', 'ton', 'catch'];

        words.forEach((word, i) => {
            const matches = findMatches(word, dict);

            expect(matches).toContain(dict[i]);
        });
    });

    it('is not case sensitive', () => {
        const words = ['ALL', '1ton#', 'CATCH1'];
        const dict = ['all', 'TON', 'caTCH'];

        words.forEach((word, i) => {
            const matches = findMatches(word, dict);

            expect(matches).toContain(dict[i]);
        });
    });

    it('ignores A, E, I, H, O, U, W, Y after first char', () => {
        const words = ['saecki', 'AeLL', 'CIAQUI1', '1thon#', 'hoatch', 'huouse', 'cwhat', 'wyhere'];
        const dict = ['secki', 'all', 'caqui', 'TON', 'hatch', 'house', 'chat', 'where'];

        words.forEach((word, i) => {
            const matches = findMatches(word, dict);

            expect(matches).toContain(dict[i]);
        });
    });

    it(
        'Treats following groups as equivalents: ' +
        '{A, E, I, O, U} {C, G, J, K, Q, S, X, Y, Z} {B, F, P, V, W} {D, T} {M, N}',
        () => {
            const wordsDict = ['angel', 'brave', 'Braev', 'Don', 'Engel', 'go', 'goal', 'son', 'sunny', 'Tom', 'Tooonnnnyyyy'];
            const expectedResults = {
                '1ton#': ['Don', 'Tom', 'Tooonnnnyyyy'],
                'brief': ['brave', 'Braev'],
                'soon': ['son', 'sunny']
            };

            Object.keys(expectedResults).forEach(word => {
                const matches = findMatches(word, wordsDict);

                expect(matches).toEqual(expectedResults[word]);
            });
        }
    );

    it('Ignores consecutive occurrences of the same match', () => {
        const words = ['yahhhhhhhooooooooooo!', 'what', 'pppprrrrinngggleesss'];
        const dict = ['yahu', 'whhhhaaaaaaaattttttt?', 'pringles'];

        words.forEach((word, i) => {
            const matches = findMatches(word, dict);

            expect(matches).toContain(dict[i]);
        });
    });
});
