import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, typeOfData) => {
  switch (typeOfData) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.safeLoad(data);
    case 'ini':
      return ini.parse(data);
    default:
      throw new Error(`Unknown type: ${typeOfData}`);
  }
};

export default parse;
