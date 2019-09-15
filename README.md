<h1 align="center">Welcome to ffv 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/ffv">
    <img alt="Version" src="https://img.shields.io/npm/v/ffv.svg">
  </a>
  <img src="https://img.shields.io/badge/npm-%3E%3D5.5.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D8.0.0-blue.svg" />
  <a href="https://github.com/dimkl/ffv#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/dimkl/ffv/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/dimkl/ffv/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> File format validation project is responsible to check if file contents match provided extension

### 🏠 [Homepage](https://github.com/dimkl/ffv#readme)

## Prerequisites

- npm >=5.5.0
- node >=8.0.0

## Install

```sh
npm install ffv-validator
```

## Run tests

```sh
npm run test
```

## Example

```javascript
const fs = require('fs');
const { validate } = require('ffv');

const filename = './download.jpeg';
const readStream = fs.createReadStream(filename, { highWaterMark: 512 });
const wstream = fs.createWriteStream('download-1.png');

const pass = validate('jpeg');

readStream
  .pipe(pass)
  .pipe(wstream)
  .on('error', err => {
    console.error('Pipeline failed.', err);
  })
  .on('close', () => {
    console.log('Pipeline succeeded.');
  });
```

## Resources

- https://www.garykessler.net/library/file_sigs.html
- https://www.owasp.org/index.php/OWASP_File_Format_Validation_Project

## Author

👤 **Dimitris Klouvas <dimitris.klouvas@gmail.com>**

- Github: [@dimkl](https://github.com/dimkl)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/dimkl/ffv/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Dimitris Klouvas <dimitris.klouvas@gmail.com>](https://github.com/dimkl).<br />
This project is [MIT](https://github.com/dimkl/ffv/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
