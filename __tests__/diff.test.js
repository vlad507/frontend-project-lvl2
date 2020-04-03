import fs from 'fs';
import path from 'path';
import findDiff from '../src/index.js';


test('findDiff', () => {
  const diffFile = fs.readFileSync(path.resolve(process.cwd(), 'difference.json'), 'utf-8');
  expect(findDiff('before.json', 'after.json')).toBe(diffFile);
});
