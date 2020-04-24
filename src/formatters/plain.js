import _ from 'lodash';

const convertToDisplayType = (value) => {
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

const convertNodeToPlain = (node, path = '') => {
  const {
    name, type, children, value, afterValue, beforeValue,
  } = node;
  const convertedValue = convertToDisplayType(value);
  const convertedBeforeValue = convertToDisplayType(beforeValue);
  const convertedAfterValue = convertToDisplayType(afterValue);
  const nameWithPath = (path.length !== 0) ? `${path}.${name}` : name;
  switch (type) {
    case 'added':
      return `Property '${nameWithPath}' was added with value: ${convertedValue}`;
    case 'tree':
      return _.flatten(children.map((child) => convertNodeToPlain(child, `${nameWithPath}`)));
    case 'deleted':
      return `Property '${nameWithPath}' was deleted`;
    case 'changed':
      return `Property '${nameWithPath}' was changed from ${convertedBeforeValue} to ${convertedAfterValue}`;
    case 'unchanged':
      return '';
    default:
      throw new Error(`Unknown type of node: '${type}'!`);
  }
};

const convertToPlain = (arrayOfObjDifferences) => {
  const arrayOfPlainDiff = _.compact(
    _.flatten(
      arrayOfObjDifferences.map((node) => convertNodeToPlain(node)),
    ),
  );
  const plainDifferences = arrayOfPlainDiff.join('\n');
  return plainDifferences;
};

export default convertToPlain;
