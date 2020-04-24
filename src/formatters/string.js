import _ from 'lodash';

const makeRetreat = (level, place) => {
  if (place === 'head') {
    return ' '.repeat(level * 4 + 2);
  }
  return ' '.repeat(level * 4);
};

const strignifyObj = (node, level) => {
  const headRetreat = makeRetreat(level, 'head');
  const tailRetreat = makeRetreat(level, 'tail');
  const keys = Object.keys(node);
  return keys.map((key) => {
    if (_.isObject(node[key])) {
      return `{\n${headRetreat}  ${key}: ${strignifyObj(node[key], level + 1)
        .join('')}\n${tailRetreat}}`;
    }
    return `{\n${headRetreat}  ${key}: ${node[key]}\n${tailRetreat}}`;
  });
};

const convertNodeToString = (node, level = 0) => {
  const {
    name, type, children, value, afterValue, beforeValue,
  } = node;
  const headRetreat = makeRetreat(level, 'head');
  const stringValue = (value && _.isObject(value) ? strignifyObj(value, level + 1) : value);
  const stringAfterValue = (afterValue && _.isObject(afterValue)
    ? strignifyObj(afterValue, level + 1) : afterValue);
  const stringBeforeValue = (beforeValue && _.isObject(beforeValue)
    ? strignifyObj(beforeValue, level + 1) : beforeValue);
  switch (type) {
    case 'added':
      return `${headRetreat}+ ${name}: ${stringValue}\n`;
    case 'tree':
      return `${headRetreat}  ${name}: {\n${children
        .map((child) => convertNodeToString(child, level + 1))
        .join('')}${makeRetreat(level + 1, 'tail')}}\n`;
    case 'deleted':
      return `${headRetreat}- ${name}: ${stringValue}\n`;
    case 'changed':
      return `${headRetreat}- ${name}: ${stringBeforeValue}\n${headRetreat}+ ${name}: ${stringAfterValue}\n`;
    case 'unchanged':
      return `${headRetreat}  ${name}: ${stringValue}\n`;
    default:
      throw new Error(`Unknown type of node: '${type}'!`);
  }
};

const convertToString = (arrayOfObjDifferences) => {
  const arrayOfStringsDiff = arrayOfObjDifferences.map((node) => convertNodeToString(node));
  const stringDifferences = `{\n${arrayOfStringsDiff.join('')}}`;
  return stringDifferences;
};

export default convertToString;
