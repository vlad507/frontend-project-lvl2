import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import ini from 'ini';

const readFile = (filePath) => {
  const fullNameOfFile = path.resolve(process.cwd(), String(filePath));
  const fileData = fs.readFileSync(fullNameOfFile, 'utf-8');
  return fileData;
};

const parse = (filePath) => {
  const extension = path.extname(filePath).toLowerCase();
  const fileData = readFile(filePath);
  switch (extension) {
    case '.json':
      return JSON.parse(fileData);
    case '.yaml':
      return yaml.safeLoad(fileData);
    case '.ini':
      return ini.parse(fileData);
    default:
      throw new Error('Неизвестное расширение файла!');
  }
};

export default parse;
