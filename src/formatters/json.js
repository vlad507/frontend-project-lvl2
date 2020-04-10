import { flatten } from 'lodash';

const convertToJSON = (node) => {
  const {
    name, type, children, value, afterValue, beforeValue,
  } = node;
  console.log(value);
  switch (type) {
    case 'added':
      return { [name]: { type, value } };
    case 'tree':
      return {
        [name]: { type, children: flatten(children.map((child) => convertToJSON(child))) },
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

export default convertToJSON;
