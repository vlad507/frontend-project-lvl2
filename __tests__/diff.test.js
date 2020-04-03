import fs from 'fs';
import path from 'path';
import findDiff from '../src/index.js';


test('findDiff', () => {
  const diffFile = fs.readFileSync(path.resolve(path.dirname('./__fixtures__/difference.json'), 'difference.json'), 'utf-8');
  expect(findDiff('./__fixtures__/before.json', './__fixtures__/after.json')).toBe(diffFile);
});
