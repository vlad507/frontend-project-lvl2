import _ from 'lodash';
import findDiff from './diff.js';
import parsers from './parsers.js';
import convertToString from './stringify.js';

export default (firstFile, secondFile) => {
  const firstObject = parsers(firstFile);
  const secondObject = parsers(secondFile);
  const difference = findDiff(firstObject, secondObject);
  const diffStr = difference.map((node) => convertToString(node));
  return `{\n${_.flatten(diffStr).join('')}}`;
};
