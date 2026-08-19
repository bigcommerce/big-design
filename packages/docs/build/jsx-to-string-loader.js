// Vendored from the unmaintained `jsx-to-string-loader` npm package (last published 2020),
// so this loader stays under our control instead of an inactive third-party dependency.
// Turns the JSX between `/* jsx-to-string:start */` and `/* jsx-to-string:end */` comments
// into an equivalent template-literal string, so `<CodePreview>` can display and live-compile
// it while the surrounding page still authors the example as real, type-checked JSX.
const START_KEY = '/* jsx-to-string:start */';
const END_KEY = '/* jsx-to-string:end */';

function jsxToStringLoader(source) {
  const sourceArr = source.split('\n');
  const start = sourceArr.findIndex((line) => line.includes(START_KEY));
  const end = sourceArr.findIndex((line) => line.includes(END_KEY));

  if (start === -1 || end === -1) {
    return sourceArr.join('\n');
  }

  // If we find {} we assume its jsx:  {/* jsx-to-string:start */}
  // If not we just wrap the content in `
  sourceArr[start] = sourceArr[start].includes('{') ? '{`' : '`';
  sourceArr[end] = sourceArr[end].includes('}') ? '`}' : '`';

  // Number of white-spaces to remove from all lines
  const leftPad = sourceArr[start + 1].search(/\S|$/);

  // Remove extra white-spaces, escape backticks and ${}
  for (let i = start + 1; i < end; i++) {
    sourceArr[i] = sourceArr[i].substr(leftPad);
    sourceArr[i] = sourceArr[i].replace(/(?<!\\)`/g, '\\`');
    sourceArr[i] = sourceArr[i].replace(/(?<!\\)\${/g, '\\${');
  }

  // Remove extra {} on JS Expressions
  if (sourceArr[start + 1].trim().charAt(0) === '{') {
    sourceArr[start + 1] = sourceArr[start + 1].replace('{', '');
    sourceArr[end - 1] = sourceArr[end - 1].replace('}', '');
  }

  // Collapse the marker lines into their neighbors
  sourceArr.splice(end - 1, 2, sourceArr[end - 1].concat(sourceArr[end]));
  sourceArr.splice(start, 2, sourceArr[start].concat(sourceArr[start + 1]));

  return jsxToStringLoader(sourceArr.join('\n'));
}

module.exports = jsxToStringLoader;
