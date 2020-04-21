import yaml from 'js-yaml';
import ini from 'ini';

const parse = (fileData, extensionOfFile) => {
  switch (extensionOfFile) {
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
