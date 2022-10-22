import { describe, expect, it } from 'vitest';

import { add, sortInventory } from './utils';

describe('add', () => {
    it.each([
        [1, 2, 3],
        [0, 0, 0],
        [2, -1, 1],
    ])('%s + %s = %s', async (...args) =>
        expect(add(args[0], args[1])).toBe(args[2]),
    );
});

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
