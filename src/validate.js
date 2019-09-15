const { Transform } = require('stream');
const { Validator } = require('./validator');

function validate(extension) {
  let lastChunk;
  let checkPassed = false;
  const validator = Validator.create(extension);

  const validatorStream = new Transform({
    transform(chunk, encoding, callback) {
      if (!checkPassed) {
        try {
          validator.checkPrefix(chunk);
        } catch (err) {
          return callback(err);
        }

        checkPassed = true;
      }

      lastChunk = chunk;
      callback(null, chunk);
    }
  });

  validatorStream.on('end', chunk => {
    try {
      validator.checkSuffix(lastChunk);
    } catch (error) {
      validatorStream.destroy(error);
    }
  });

  return validatorStream;
}

module.exports = validate;
