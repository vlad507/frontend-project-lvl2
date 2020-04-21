import _ from 'lodash';

const checkValue = (value) => {
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
  const checkedValue = checkValue(value);
  const checkedBeforeValue = checkValue(beforeValue);
  const checkedAfterValue = checkValue(afterValue);
  const nameWithPath = (path.length !== 0) ? `${path}.${name}` : name;
  switch (type) {
    case 'added':
      return `Property '${nameWithPath}' was added with value: ${checkedValue}`;
    case 'tree':
      return _.flatten(children.map((child) => convertNodeToPlain(child, `${nameWithPath}`)));
    case 'deleted':
      return `Property '${nameWithPath}' was deleted`;
    case 'changed':
      return `Property '${nameWithPath}' was changed from ${checkedBeforeValue} to ${checkedAfterValue}`;
    case 'unchanged':
      return '';
    default:
      throw new Error('Неизвестный тип изменения!');
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
