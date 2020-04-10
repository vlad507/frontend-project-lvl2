import _ from 'lodash';
import findDiff from './diff.js';
import parsers from './parsers.js';
import convertToString from './formatters/string.js';
import convertToPlain from './formatters/plain.js';

export default (firstFile, secondFile, format = 'string') => {
  const firstObject = parsers(firstFile);
  const secondObject = parsers(secondFile);
  const difference = findDiff(firstObject, secondObject);
  switch (format) {
    case 'string':
      return `{\n${difference.map((node) => convertToString(node)).join('')}}`;
    case 'plain':
      return _.compact(_.flatten(difference.map((node) => convertToPlain(node)))).join('\n');
    default:
      throw new Error('Неизвестный формат вывода');
  }
};
