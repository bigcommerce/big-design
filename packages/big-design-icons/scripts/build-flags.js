const { default: svgr } = require('@svgr/core');
// const camelcase = require('camelcase');
const { outputFile, readFile } = require('fs-extra');
const glob = require('glob-promise');
const { basename, join } = require('path');
const rimraf = require('rimraf');
const { promisify } = require('util');

const config = require('./svgr-flags.config');

const SOURCE = join(__dirname, '..', '..', '..', 'node_modules', 'flag-icon-css', 'flags', '4x3', '*.svg');
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
          },
        ],
      },
    },
    { componentName: iconName },
  );

  return outputFile(destPath, code);
}

async function generateFlags() {
  const iconFiles = await glob(SOURCE);

  return Promise.all(
    iconFiles.map((iconFilePath) => {
      const filename = basename(iconFilePath, '.svg');
      const name = `${filename.replace('-', '').toUpperCase()}FlagIcon`;

      // TODO: Skip these two flags for now
      if (name === 'BOFlagIcon' || name === 'NZFlagIcon') {
        return null;
      }

      componentNames.add(name);

      // eslint-disable-next-line no-console
      console.log(`Building: ${name}`);

      return convertToReactComponent(iconFilePath, name);
    }),
  );
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
