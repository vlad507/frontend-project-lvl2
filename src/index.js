import findDiff from './diff.js';
import parsers from './parsers.js';

export default (firstFile, secondFile) => {
  const firstObject = parsers(firstFile);
  const secondObject = parsers(secondFile);
  return findDiff(firstObject, secondObject);
};
