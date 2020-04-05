import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parsers = (file) => {
  const extension = path.extname(file).toLowerCase();
  const fullNameOfFile = path.resolve(process.cwd(), String(file));
  const fileData = fs.readFileSync(fullNameOfFile, 'utf-8');
  switch (extension) {
    case '.json':
      return JSON.parse(fileData);
    case '.yaml':
      return yaml.safeLoad(fileData)
        .reduce(((acc, currentItem) => ({ ...acc, ...currentItem })), {});
    default:
      throw new Error('Неизвестное расширение файла!');
  }
};

export default parsers;