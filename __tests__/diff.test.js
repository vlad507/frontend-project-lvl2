import fs from 'fs';
import path from 'path';
import findDiff from '../src/index.js';

let diffFileString;
let diffFilePlain;
let diffFileJSON;

const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturesPath(filename), 'utf-8'); 

beforeAll(() => {
  diffFileString = readFile('differenceSubObj');
  diffFilePlain = readFile('differencePlain');
  diffFileJSON = readFile('difference.json');
});

const filePaths = [
  [getFixturesPath('beforeSubObj.json'), getFixturesPath('afterSubObj.json')],
  [getFixturesPath('before.yaml'), getFixturesPath('after.yaml')],
  [getFixturesPath('before.ini'), getFixturesPath('after.ini')],
];

test.each(filePaths)('findDiff String', (firstFilePath, secondFilePath) => {
  expect(findDiff(firstFilePath, secondFilePath, 'string')).toBe(diffFileString);
});

test.each(filePaths)('findDiff Plain', (firstFilePath, secondFilePath) => {
  expect(findDiff(firstFilePath, secondFilePath, 'plain')).toBe(diffFilePlain);
});

test.each(filePaths)('findDiff JSON', (firstFilePath, secondFilePath) => {
  expect(findDiff(firstFilePath, secondFilePath, 'json')).toBe(diffFileJSON);
});
