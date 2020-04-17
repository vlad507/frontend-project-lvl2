import fs from 'fs';
import path from 'path';
import findDiff from '../src/index.js';

let diffFileString;
let diffFilePlain;
let diffFileJSON;

beforeAll(() => {
  diffFileString = fs.readFileSync(path.resolve(path.dirname('./__fixtures__/differenceSubObj'), 'differenceSubObj'), 'utf-8');
  diffFilePlain = fs.readFileSync(path.resolve(path.dirname('./__fixtures__/differencePlain'), 'differencePlain'), 'utf-8');
  diffFileJSON = fs.readFileSync(path.resolve(path.dirname('./__fixtures__/difference.json'), 'difference.json'), 'utf-8');
});

const files = [
  ['./__fixtures__/beforeSubObj.json', './__fixtures__/afterSubObj.json'],
  ['./__fixtures__/before.yaml', './__fixtures__/after.yaml'],
  ['./__fixtures__/before.ini', './__fixtures__/after.ini'],
];

test.each(files)('findDiff String', (firstFile, secondFile) => {
  expect(findDiff(firstFile, secondFile, 'string')).toBe(diffFileString);
});

test.each(files)('findDiff Plain', (firstFile, secondFile) => {
  expect(findDiff(firstFile, secondFile, 'plain')).toBe(diffFilePlain);
});

test.each(files)('findDiff JSON', (firstFile, secondFile) => {
  expect(findDiff(firstFile, secondFile, 'json')).toBe(diffFileJSON);
});
