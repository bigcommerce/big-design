const { default: svgr } = require('@svgr/core');
const { outputFile, readFile } = require('fs-extra');
const glob = require('glob-promise');
const { cpus } = require('os');
const { basename, join } = require('path');
const rimraf = require('rimraf');
const asyncPool = require('tiny-async-pool');
const { promisify } = require('util');

const config = require('./svgr-flags.config');

const SOURCE = join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'flag-icons',
  'flags',
  '4x3',
  '*.svg',
);
const DEST_PATH = join(__dirname, '..', 'src', 'flags', 'components');

const componentNames = new Set();
const asyncRimraf = promisify(rimraf);

async function convertToReactComponent(filePath, iconName) {
  const svgCode = await readFile(filePath, 'utf8');
  const destPath = join(DEST_PATH, `${iconName}.tsx`);

  const code = await svgr(
    svgCode,
    {
      ...config,
      // Need to add the svgo config here to have access to iconName
      svgoConfig: {
        plugins: [
          {
            prefixIds: {
              prefix: iconName,
            },
            removeViewBox: false,
            removeXMLNS: true,
          },
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
  return asyncRimraf(DEST_PATH);
}

(async () => {
  await cleanDestDirectory();
  await generateFlags();

  const indexFile = Array.from(componentNames).map((name) => `export * from './${name}';`);

  await outputFile(join(DEST_PATH, 'index.ts'), indexFile.join('\n'));

  // eslint-disable-next-line no-console
  console.log('Done!');
})();
