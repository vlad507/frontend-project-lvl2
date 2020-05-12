import _ from 'lodash';

const indent = (depth, place) => {
  if (place === 'head') {
    return ' '.repeat(depth * 4 + 2);
  }
  return ' '.repeat(depth * 4);
};

const stringify = (node, depth) => {
  const headIndent = indent(depth, 'head');
  const tailIndent = indent(depth, 'tail');
  return (_.isObject(node))
    ? Object.keys(node)
      .map((key) => ((_.isObject(node[key]))
        ? `{\n${headIndent}  ${key}: ${stringify(node[key], depth + 1)
          .join('\n')}\n${tailIndent}}`
        : `{\n${headIndent}  ${key}: ${node[key]}\n${tailIndent}}`))
    : node;
};

const convertToStylish = (objDifferences, depth = 0) => {
  const convertNodeToString = (node) => {
    const {
      name, type, children, value, afterValue, beforeValue,
    } = node;
    const headIndent = indent(depth, 'head');
    const convertedValue = stringify(value, depth + 1);
    const convertedAfterValue = stringify(afterValue, depth + 1);
    const convertedBeforeValue = stringify(beforeValue, depth + 1);
    switch (type) {
      case 'added':
        return `${headIndent}+ ${name}: ${convertedValue}`;
      case 'tree':
        return `${headIndent}  ${name}: {\n${convertToStylish(children, depth + 1)}\n${indent(depth + 1, 'tail')}}`;
      case 'deleted':
        return `${headIndent}- ${name}: ${convertedValue}`;
      case 'changed':
        return `${headIndent}- ${name}: ${convertedBeforeValue}\n${headIndent}+ ${name}: ${convertedAfterValue}`;
      case 'unchanged':
        return `${headIndent}  ${name}: ${convertedValue}`;
      default:
        throw new Error(`Unknown type of node: '${type}'!`);
    }
  };
  const getStringsDiff = objDifferences.map((node) => convertNodeToString(node));
  const stringDifferences = getStringsDiff.join('\n');
  return (depth === 0) ? `{\n${stringDifferences}\n}` : stringDifferences;
};

export default convertToStylish;
