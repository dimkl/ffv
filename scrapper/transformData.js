const fs = require('fs');
const data = require('./data.json');

const wstream = fs.createWriteStream('./extensions.json');
const transformedData = {};

const offsetRegex = /\[(\d+)\]/;
const retrieveOffset = s => (s.match(offsetRegex) || [])[1];

const format = s => s && s.toLowerCase().replace(/ /g, '');
const formatKey = s => s && format(s.replace(offsetRegex, ''));

Object.entries(data).forEach(([key, info]) => {
  info.forEach(extInfo => {
    const { extension, trailer, information } = extInfo;
    const extensions = extension.split(', ');

    extensions.forEach(ext => {
      const trailers = !Array.isArray(trailer) ? [trailer] : trailer;
      ext = format(ext);
      transformedData[ext] = transformedData[ext] || [];

      trailers.forEach(t => {
        transformedData[ext].push({
          prefix: formatKey(key),
          suffix: formatKey(t),
          info: information,
          offset: retrieveOffset(key)
        });
      });
    });
  });
});

wstream.end(JSON.stringify(transformedData));
