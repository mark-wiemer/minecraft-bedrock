import { describe, expect, it } from 'vitest';

import { sortInventory } from './utils';

describe('sortInventory', () => {
    it.each([
        [
            'merge stacks',
            [
                { id: 'apple', amount: 1 },
                { id: 'apple', amount: 2 },
            ],
            [{ id: 'apple', amount: 3 }],
        ],
        [
            'remove empty slots',
            [{ id: 'apple', amount: 1 }, undefined, { id: 'bread', amount: 2 }],
            [
                { id: 'apple', amount: 1 },
                { id: 'bread', amount: 2 },
            ],
        ],
        // eslint-disable-next-line no-unused-vars
    ])('%s', async (...[name, unsortedInventory, expected]) =>
        expect(sortInventory(unsortedInventory)).toEqual(expected),
    );
});
