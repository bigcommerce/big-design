const { transform } = require('@svgr/core');
const { outputFile, readFile } = require('fs-extra');
const { glob } = require('glob');
const { cpus } = require('os');
const { basename, join } = require('path');
const { rimraf } = require('rimraf');
const asyncPool = require('tiny-async-pool');

const removeInkscapeAttrs = require('./removeInkscapeAttrs.plugin');
const config = require('./svgr-flags.config');

const SOURCE = join(__dirname, '..', 'node_modules', 'flag-icons', 'flags', '4x3', '*.svg');
const DEST_PATH = join(__dirname, '..', 'src', 'flags', 'components');

const componentNames = new Set();

async function convertToReactComponent(filePath, iconName) {
  const svgCode = await readFile(filePath, 'utf8');
  const destPath = join(DEST_PATH, `${iconName}.tsx`);

  const code = await transform(
    svgCode,
    {
      ...config,
      // Need to add the svgo config here to have access to iconName
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
          {
            name: 'prefixIds',
            params: {
              prefix: iconName,
            },
          },
          'removeXMLNS',
          removeInkscapeAttrs,
        ],
      },
    },
    { componentName: iconName },
  );

  return outputFile(destPath, code);
}

function convertWithConcurrencyPool(iconFiles) {
  return asyncPool(cpus().length, iconFiles, (iconFilePath) => {
    const filename = basename(iconFilePath, '.svg');
    const name = `${filename.replace('-', '').toUpperCase()}FlagIcon`;

    componentNames.add(name);

    // eslint-disable-next-line no-console
    console.log(`Building: ${name}`);

    return convertToReactComponent(iconFilePath, name);
  });
}

async function generateFlags() {
  const iconFiles = await glob(SOURCE);

  // eslint-disable-next-line curly
  for await (const _result of convertWithConcurrencyPool(iconFiles));
}

function cleanDestDirectory() {
  return rimraf(DEST_PATH);
}

(async () => {
  await cleanDestDirectory();
  await generateFlags();

  const indexFile = Array.from(componentNames)
    .sort()
    .map((name) => `export * from './${name}';`);

  await outputFile(join(DEST_PATH, 'index.ts'), indexFile.join('\n'));

  // eslint-disable-next-line no-console
  console.log('Done!');
})();
