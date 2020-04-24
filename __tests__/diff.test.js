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
  ['beforeSubObj.json', 'afterSubObj.json'],
  ['before.yaml', 'after.yaml'],
  ['before.ini', 'after.ini'],
];

test.each(filePaths)('findDiff', (firstFilePath, secondFilePath) => {
  const firstFixtureFilePath = getFixturesPath(firstFilePath);
  const secondFixtureFilePath = getFixturesPath(secondFilePath);
  expect(findDiff(firstFixtureFilePath, secondFixtureFilePath, 'string')).toBe(diffFileString);
  expect(findDiff(firstFixtureFilePath, secondFixtureFilePath, 'plain')).toBe(diffFilePlain);
  expect(findDiff(firstFixtureFilePath, secondFixtureFilePath, 'json')).toBe(diffFileJSON);
});
