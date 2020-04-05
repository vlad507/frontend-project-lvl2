import _ from 'lodash';

const findDiff = (object1, object2) => {
  const objectKeys1 = Object.keys(object1);
  const objectKeys2 = Object.keys(object2);
  const assignObjects = _.assign({}, object1, object2);
  const changedKeys = _.xor(objectKeys1, objectKeys2);
  const arrayWithChanges = Object.entries(assignObjects).reduce((acc, entrie) => {
    const [key, value] = entrie;
    if (changedKeys.includes(key)) {
      return (objectKeys1.includes(key)) ? [...acc, [`  - ${key}: ${value}`]] : [...acc, [`  + ${key}: ${value}`]];
    }
    if (object1[key] === value) {
      return [...acc, [`    ${key}: ${value}`]];
    }
    return [...acc, [`  + ${key}: ${value}\n  - ${key}: ${object1[key]}`]];
  }, []);
  return `{\n${arrayWithChanges.join('\n')}\n}`;
};

export default findDiff;
