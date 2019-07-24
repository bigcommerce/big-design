const pkg = require('./package.json');
const { generateConfig } = require('@bigcommerce/configs/rollup');

module.exports = generateConfig(pkg);
