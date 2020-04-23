const { default: svgr } = require('@svgr/core');
const camelcase = require('camelcase');
const { outputFile, readFile } = require('fs-extra');
const glob = require('glob-promise');
const { basename, join } = require('path');
const rimraf = require('rimraf');
const { promisify } = require('util');

const config = require('./svgr.config');

const SOURCE = join(__dirname, '..', 'svgs', '*', '*.svg');
const DEST_PATH = join(__dirname, '..', 'src', 'components');

const componentNames = new Set();
const asyncRimraf = promisify(rimraf);

async function convertToReactComponent(filePath, iconName) {
  const svgCode = await readFile(filePath, 'utf8');
  const destPath = join(DEST_PATH, `${iconName}.tsx`);
  const code = await svgr(svgCode, config, { componentName: iconName });

  return outputFile(destPath, code);
}

async function generateIcons() {
  const iconFiles = await glob(SOURCE);

  return Promise.all(
    iconFiles.map((iconFilePath) => {
      const filename = basename(iconFilePath, '.svg');
      const name = `${camelcase(filename, { pascalCase: true })}Icon`;

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
  await generateIcons();

  const indexFile = Array.from(componentNames).map((name) => `export * from './${name}';`);

  await outputFile(join(DEST_PATH, 'index.ts'), indexFile.join('\n'));

  // eslint-disable-next-line no-console
  console.log('Done!');
})();
