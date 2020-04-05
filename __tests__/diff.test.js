import fs from 'fs';
import path from 'path';
import findDiff from '../src/index.js';

const diffFile = fs.readFileSync(path.resolve(path.dirname('./__fixtures__/difference'), 'difference'), 'utf-8');

test('findDiff in JSON', () => {
  expect(findDiff('./__fixtures__/before.json', './__fixtures__/after.json')).toBe(diffFile);
});

test('findDiff in YAML', () => {
  expect(findDiff('./__fixtures__/before.yaml', './__fixtures__/after.yaml')).toBe(diffFile);
});
