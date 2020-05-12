import convertToStylish from './stylish.js';
import convertToPlain from './plain.js';
import convertToJSON from './json.js';

const toFormat = (dataToFormat, format) => {
  switch (format) {
    case 'stylish':
      return convertToStylish(dataToFormat);
    case 'plain':
      return convertToPlain(dataToFormat);
    case 'json':
      return convertToJSON(dataToFormat);
    default:
      throw new Error(`Unknown format: '${format}'`);
  }
};

export default toFormat;
