import { describe, expect, it } from 'vitest';

import { add } from './utils';

describe('add', () => {
    it.each([
        [1, 2, 3],
        [0, 0, 0],
        [2, -1, 1]
    ])('%s + %s = %s', async (...args) => expect(add(args[0], args[1])).toBe(args[2]))
})