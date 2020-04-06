import fs from 'fs';
import path from 'path';
import findDiff from '../src/index.js';

const diffFile = fs.readFileSync(path.resolve(path.dirname('./__fixtures__/difference'), 'difference'), 'utf-8');

test.each([
  ['./__fixtures__/before.json', './__fixtures__/after.json'],
  ['./__fixtures__/before.yaml', './__fixtures__/after.yaml'],
  ['./__fixtures__/before.ini', './__fixtures__/after.ini'],
])('findDiff', (firstFile, secondFile) => {
  expect(findDiff(firstFile, secondFile)).toBe(diffFile);
});
