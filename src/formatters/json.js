import { flatten } from 'lodash';

const convertNodeToJSON = (node) => {
  const {
    name, type, children, value, afterValue, beforeValue,
  } = node;
  switch (type) {
    case 'added':
      return { [name]: { type, value } };
    case 'tree':
      return {
        [name]: { type, children: flatten(children.map((child) => convertNodeToJSON(child))) },
      };
    case 'deleted':
      return { [name]: { type, value } };
    case 'changed':
      return { [name]: { type, beforeValue, afterValue } };
    case 'unchanged':
      return { [name]: { type, value } };
    default:
      throw new Error('Неизвестный тип изменения!');
  }
};

const convertToJSON = (arrayOfObjDifferences) => {
  const ObjectOfJSONDiff = arrayOfObjDifferences
    .reduce((acc, node) => ({ ...acc, ...convertNodeToJSON(node) }), {});
  const jsonDifferences = JSON.stringify(ObjectOfJSONDiff, null, '  ');
  return jsonDifferences;
};

export default convertToJSON;
