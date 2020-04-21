import path from 'path';
import fs from 'fs';
import findDiff from './diff.js';
import parse from './parsers.js';
import toFormat from './formatters/index.js';

const readFile = (filePath) => {
  const fullNameOfFile = path.resolve(process.cwd(), String(filePath));
  const fileData = fs.readFileSync(fullNameOfFile, 'utf-8');
  return fileData;
};

export default (firstFilePath, secondFilePath, format = 'string') => {
  const data1 = readFile(firstFilePath);
  const data2 = readFile(secondFilePath);
  const extensionOfFirstFile = path.extname(firstFilePath).toLowerCase();
  const extensionOfSecondFile = path.extname(secondFilePath).toLowerCase();
  const firstObject = parse(data1, extensionOfFirstFile);
  const secondObject = parse(data2, extensionOfSecondFile);
  const difference = findDiff(firstObject, secondObject);
  const formattedDifference = toFormat(difference, format);
  return formattedDifference;
};
