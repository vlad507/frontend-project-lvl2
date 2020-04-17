import _ from 'lodash';

const findDiff = (object1, object2) => {
  const keysOfObj1 = Object.keys(object1);
  const keysOfObj2 = Object.keys(object2);
  const unionKeys = _.union(keysOfObj1, keysOfObj2);
  return unionKeys.map((key) => {
    if (!Reflect.has(object1, key)) {
      return { name: key, type: 'added', value: object2[key] };
    }
    if (!Reflect.has(object2, key)) {
      return { name: key, type: 'deleted', value: object1[key] };
    }
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { name: key, type: 'tree', children: findDiff(object1[key], object2[key]) };
    }
    if (object1[key] !== object2[key]) {
      return {
        name: key, type: 'changed', beforeValue: object1[key], afterValue: object2[key],
      };
    }
    return { name: key, type: 'unchanged', value: object1[key] };
  });
};

export default findDiff;
