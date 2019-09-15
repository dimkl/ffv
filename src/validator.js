const { ExtensionValidationError, ExtensionNotFound } = require('./errors');
const database = require('./extensions.json');

class Validator {
  constructor(config) {
    this.config = config;
  }

  checkPrefix(chunk) {
    const isValid = this.config.some(({ prefix, offset }) => {
      if (!prefix) {
        return true;
      }
      offset = this.config.offset ? Number(offset) - 1 : 0;
      const data = chunk.slice(offset, prefix.length).toString('hex');
      const regex = new RegExp(`^${this._convertConfRegexFriendly(prefix)}`);

      return regex.test(data);
    });

    if (!isValid) {
      throw new ExtensionValidationError(ext, this.config.info);
    }
  }

  checkSuffix(chunk) {
    const isValid = this.config.some(({ suffix, offset }) => {
      if (!suffix) {
        return true;
      }

      offset = chunk.length - suffix.length;

      const data = chunk.slice(offset, chunk.length).toString('hex');
      const regex = new RegExp(`${this._convertConfRegexFriendly(suffix)}$`);

      return regex.test(data);
    });

    if (!isValid) {
      throw new ExtensionValidationError(ext, this.config.info);
    }
  }

  _convertConfRegexFriendly(s) {
    const countX = s.split('x').length - 1;
    s = s.replace(/x/g, `[a-z]{${countX}}`);
    const countN = s.split('n').length - 1;
    s = s.replace(/x/g, `[0-9]{${countN}}`);

    return s;
  }

  static create(ext) {
    if (!database[ext]) {
      throw new ExtensionNotFound(ext);
    }

    return new this(database[ext]);
  }
}

module.exports = { Validator };
