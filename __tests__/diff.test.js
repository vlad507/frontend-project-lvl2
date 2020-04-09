import fs from 'fs';
import path from 'path';
import findDiff from '../src/index.js';

const diffFileSubObj = fs.readFileSync(path.resolve(path.dirname('./__fixtures__/differenceSubObj'), 'differenceSubObj'), 'utf-8');

test.each([
  ['./__fixtures__/beforeSubObj.json', './__fixtures__/afterSubObj.json'],
  ['./__fixtures__/before.yaml', './__fixtures__/after.yaml'],
  ['./__fixtures__/before.ini', './__fixtures__/after.ini'],
])('findDiff', (firstFile, secondFile) => {
  expect(findDiff(firstFile, secondFile)).toBe(diffFileSubObj);
});
