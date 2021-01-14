import { countTest } from '../api/functions';

test('It adds two numbers', () => {
  expect(countTest('one')).toBe(3);
});