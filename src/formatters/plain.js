import _ from 'lodash';

const stringify = (value) => {
  const isValueObject = (value && _.isObject(value));
  const isValueString = (value && _.isString(value));
  if (isValueObject) {
    return '[complex value]';
  }
  if (isValueString) {
    return `'${value}'`;
  }
  return value;
};

const convertToPlain = (objDifferences, path = '') => {
  const convertNodeToPlain = (node) => {
    const {
      name, type, children, value, afterValue, beforeValue,
    } = node;
    const convertedValue = stringify(value);
    const convertedBeforeValue = stringify(beforeValue);
    const convertedAfterValue = stringify(afterValue);
    const nameWithPath = (path.length !== 0) ? `${path}.${name}` : name;
    switch (type) {
      case 'added':
        return `Property '${nameWithPath}' was added with value: ${convertedValue}`;
      case 'tree':
        return convertToPlain(children, nameWithPath);
      case 'deleted':
        return `Property '${nameWithPath}' was deleted`;
      case 'changed':
        return `Property '${nameWithPath}' was changed from ${convertedBeforeValue} to ${convertedAfterValue}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown type of node: '${type}'!`);
    }
  };
  const getPlainDiff = _.compact(
    objDifferences.map((node) => convertNodeToPlain(node))
      .flat(),
  );
  const plainDifferences = getPlainDiff.join('\n');
  return plainDifferences;
};

export default convertToPlain;
