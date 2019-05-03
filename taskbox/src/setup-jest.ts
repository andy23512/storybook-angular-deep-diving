import 'jest-preset-angular';

/* global mocks for jsdom */
const mock = () => {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {})
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance']
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

if (typeof require['context'] === 'undefined') {
  const fs = require('fs');
  const path = require('path');
  Object.defineProperty(
    window,
    'requrieContext',
    (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
      const files = {};

      function readDirectory(directory) {
        fs.readdirSync(directory).forEach(file => {
          const fullPath = path.resolve(directory, file);

          if (fs.statSync(fullPath).isDirectory()) {
            if (scanSubDirectories) readDirectory(fullPath);

            return;
          }

          if (!regularExpression.test(fullPath)) return;

          files[fullPath] = true;
        });
      }

      readDirectory(path.resolve(__dirname, base));

      function Module(file) {
        return require(file);
      }

      Module.keys = () => Object.keys(files);

      return Module;
    }
  );
}

const fs = require('fs');
const path = require('path');

export const requireContext = (
  base = '.',
  scanSubDirectories = false,
  regularExpression = /\.js$/
) => {
  // @ts-ignore
  if (typeof require.context !== 'undefined') {
    // @ts-ignore
    return require.context(base, scanSubDirectories, regularExpression);
  }

  const files = {};

  function readDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
      const fullPath = path.resolve(directory, file);

      if (fs.statSync(fullPath).isDirectory()) {
        if (scanSubDirectories) readDirectory(fullPath);

        return;
      }

      if (!regularExpression.test(fullPath)) return;

      files[fullPath] = true;
    });
  }

  readDirectory(path.resolve(__dirname, base));

  function Module(file) {
    return require(file);
  }

  // @ts-ignore
  Module.keys = () => Object.keys(files);

  return Module;
};
/* output shorter and more meaningful Zone error stack traces */
// Error.stackTraceLimit = 2;
