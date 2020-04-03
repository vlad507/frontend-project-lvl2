import fs from 'fs';
import findDiff from '../src/index.js';


test('findDiff', () => {
  const diffFile = fs.readFileSync('/home/vlad/project1/frontend-project-lvl2/difference.json', 'utf-8');
  expect(findDiff('before.json', 'after.json')).toBe(diffFile);
});
