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

const valueToString = (value, level) => {
  const valueString = ((value && _.isObject(value)) ? strignifyObj(value, level) : value);
  return valueString;
};

const convertToString = (node, level = 0, resultArray = []) => {
  const {
    name, type, children, value, afterValue, beforeValue,
  } = node;
  const headRetreat = makeRetreat(level, 'head');
  const stringValue = valueToString(value, level + 1);
  const stringAfterValue = valueToString(afterValue, level + 1);
  const stringBeforeValue = valueToString(beforeValue, level + 1);
  switch (type) {
    case 'added':
      resultArray.push(`${headRetreat}+ ${name}: ${stringValue}\n`);
      break;
    case 'tree':
      resultArray
        .push(`${headRetreat}  ${name}: {\n${children
          .map((child) => convertToString(child, level + 1, []))
          .join('')}${makeRetreat(level + 1, 'tail')}}\n`);
      break;
    case 'deleted':
      resultArray.push(`${headRetreat}- ${name}: ${stringValue}\n`);
      break;
    case 'changed':
      resultArray
        .push(`${headRetreat}- ${name}: ${stringBeforeValue}\n${headRetreat}+ ${name}: ${stringAfterValue}\n`);
      break;
    case 'unchanged':
      resultArray.push(`${headRetreat}  ${name}: ${stringValue}\n`);
      break;
    default:
      throw new Error('Неизвестный тип изменения!');
  }
  return resultArray;
};

export default convertToString;
