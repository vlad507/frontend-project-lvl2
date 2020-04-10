import fs from 'fs';
import path from 'path';
import findDiff from '../src/index.js';

const diffFileString = fs.readFileSync(path.resolve(path.dirname('./__fixtures__/differenceSubObj'), 'differenceSubObj'), 'utf-8');
const diffFilePlain = fs.readFileSync(path.resolve(path.dirname('./__fixtures__/differencePlain'), 'differencePlain'), 'utf-8');
const diffFileJSON = fs.readFileSync(path.resolve(path.dirname('./__fixtures__/difference.json'), 'difference.json'), 'utf-8');

test.each([
  ['./__fixtures__/beforeSubObj.json', './__fixtures__/afterSubObj.json'],
  ['./__fixtures__/before.yaml', './__fixtures__/after.yaml'],
  ['./__fixtures__/before.ini', './__fixtures__/after.ini'],
])('findDiff String', (firstFile, secondFile) => {
  expect(findDiff(firstFile, secondFile)).toBe(diffFileString);
});

test.each([
  ['./__fixtures__/beforeSubObj.json', './__fixtures__/afterSubObj.json', 'plain'],
  ['./__fixtures__/before.yaml', './__fixtures__/after.yaml', 'plain'],
  ['./__fixtures__/before.ini', './__fixtures__/after.ini', 'plain'],
])('findDiff Plain', (firstFile, secondFile, format) => {
  expect(findDiff(firstFile, secondFile, format)).toBe(diffFilePlain);
});

test.each([
  ['./__fixtures__/beforeSubObj.json', './__fixtures__/afterSubObj.json', 'json'],
  ['./__fixtures__/before.yaml', './__fixtures__/after.yaml', 'json'],
  ['./__fixtures__/before.ini', './__fixtures__/after.ini', 'json'],
])('findDiff JSON', (firstFile, secondFile, format) => {
  expect(findDiff(firstFile, secondFile, format)).toBe(diffFileJSON);
});
