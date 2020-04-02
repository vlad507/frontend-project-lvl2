import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (nameOfFile) => {
  const fullNameOfFile = path.resolve(process.cwd(), String(nameOfFile))
  const fileData = fs.readFileSync(fullNameOfFile, 'utf-8');
  const fileObj = JSON.parse(fileData);
  return fileObj;
};

const findDiff = (file1, file2) => {
  const objFile1 = readFile(file1);
  const objKeys1 = Object.keys(objFile1);
  const objFile2 = readFile(file2);
  const objKeys2 = Object.keys(objFile2);
  const mergedObj = _.assign({}, objFile1, objFile2);
  const changedKeys = _.xor(objKeys1, objKeys2);
  const arrayWithChanges = Object.entries(mergedObj).reduce((acc, entrie) => {
    const [key, value] = entrie;
    if (changedKeys.includes(key)) {
      return (objKeys1.includes(key)) ? [...acc, [`  - ${key}: ${value}`]] : [...acc, [`  + ${key}: ${value}`]];
    }
    if (objFile1[key] === value) {
      return [...acc, [`    ${key}: ${value}`]];
    }
    return [...acc, [`  + ${key}: ${value}\n  - ${key}: ${objFile1[key]}`]];
  }, []);
  return `{\n${arrayWithChanges.join('\n')}\n}`;
};

export default findDiff;
