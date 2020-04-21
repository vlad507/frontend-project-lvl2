import convertToString from './string.js';
import convertToPlain from './plain.js';
import convertToJSON from './json.js';

const toFormat = (dataToFormat, format) => {
  switch (format) {
    case 'string':
      return convertToString(dataToFormat);
    case 'plain':
      return convertToPlain(dataToFormat);
    case 'json':
      return convertToJSON(dataToFormat);
    default:
      throw new Error('Неизвестный формат вывода');
  }
};

export default toFormat;
