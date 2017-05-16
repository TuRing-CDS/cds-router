/**
 * Created by Z on 2017-05-16.
 */
import {sum} from '../lib/sum';

import 'ts-jest';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});