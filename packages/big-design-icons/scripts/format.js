const { outputFile, readFile } = require('fs-extra');
const prettier = require('prettier');

const format = async (filepath) => {
  const fileContent = await readFile(filepath, { encoding: 'utf-8' });

  const prettierConfig = await prettier.resolveConfig(filepath);
  const formattedOutput = prettier.format(fileContent, { ...prettierConfig, filepath });

  return outputFile(filepath, formattedOutput);
};

module.exports = {
  format,
};
