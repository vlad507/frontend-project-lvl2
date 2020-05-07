import _ from 'lodash';

const makeRetreat = (level, place) => {
  if (place === 'head') {
    return ' '.repeat(level * 4 + 2);
  }
  return ' '.repeat(level * 4);
};

const strignifyObj = (node, level) => {
  if (node && _.isObject(node)) {
    const headRetreat = makeRetreat(level, 'head');
    const tailRetreat = makeRetreat(level, 'tail');
    const keys = Object.keys(node);
    return keys.map((key) => {
      if (_.isObject(node[key])) {
        return `{\n${headRetreat}  ${key}: ${strignifyObj(node[key], level + 1)
          .join('\n')}\n${tailRetreat}}`;
      }
      return `{\n${headRetreat}  ${key}: ${node[key]}\n${tailRetreat}}`;
    });
  }
  return node;
};

const convertToString = (objDifferences, levelOfNode = 0) => {
  const convertNodeToString = (node, level) => {
    const {
      name, type, children, value, afterValue, beforeValue,
    } = node;
    const headRetreat = makeRetreat(level, 'head');
    const convertedValue = strignifyObj(value, level + 1);
    const convertedAfterValue = strignifyObj(afterValue, level + 1);
    const convertedBeforeValue = strignifyObj(beforeValue, level + 1);
    switch (type) {
      case 'added':
        return `${headRetreat}+ ${name}: ${convertedValue}`;
      case 'tree':
        return `${headRetreat}  ${name}: {\n${convertToString(children, level + 1)}\n${makeRetreat(level + 1, 'tail')}}`;
      case 'deleted':
        return `${headRetreat}- ${name}: ${convertedValue}`;
      case 'changed':
        return `${headRetreat}- ${name}: ${convertedBeforeValue}\n${headRetreat}+ ${name}: ${convertedAfterValue}`;
      case 'unchanged':
        return `${headRetreat}  ${name}: ${convertedValue}`;
      default:
        throw new Error(`Unknown type of node: '${type}'!`);
    }
  };
  const getStringsDiff = objDifferences.map((node) => convertNodeToString(node, levelOfNode));
  const stringDifferences = getStringsDiff.join('\n');
  return (levelOfNode === 0) ? `{\n${stringDifferences}\n}` : stringDifferences;
};

export default convertToString;
