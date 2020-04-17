import _ from 'lodash';
import findDiff from './diff.js';
import parse from './parsers.js';
import convertToString from './formatters/string.js';
import convertToPlain from './formatters/plain.js';
import convertToJSON from './formatters/json.js';

export default (firstFilePath, secondFilePath, format = 'string') => {
  const firstObject = parse(firstFilePath);
  const secondObject = parse(secondFilePath);
  const difference = findDiff(firstObject, secondObject);
  switch (format) {
    case 'string':
      return `{\n${difference.map((node) => convertToString(node)).join('')}}`;
    case 'plain':
      return _.compact(_.flatten(difference.map((node) => convertToPlain(node)))).join('\n');
    case 'json':
      return JSON.stringify(difference.reduce((acc, node) => ({ ...acc, ...convertToJSON(node) }), {}), null, '  ');
    default:
      throw new Error('Неизвестный формат вывода');
  }
};
