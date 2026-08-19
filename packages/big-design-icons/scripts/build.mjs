import { transform } from '@svgr/core';
import camelcase from 'camelcase';
import fsExtra from 'fs-extra';
import { glob } from 'glob';
import { cpus } from 'os';
import { basename, join } from 'path';
import { rimraf } from 'rimraf';
import asyncPool from 'tiny-async-pool';

import config from './svgr.config.js';

const { outputFile, readFile } = fsExtra;

const SOURCE = join(import.meta.dirname, '..', 'svgs', '*', '*.svg');
const DEST_PATH = join(import.meta.dirname, '..', 'src', 'components');

const componentNames = new Set();

async function convertToReactComponent(filePath, iconName) {
  const svgCode = await readFile(filePath, 'utf8');
  const destPath = join(DEST_PATH, `${iconName}.tsx`);
  const code = await transform(svgCode, config, { componentName: iconName });

  return outputFile(destPath, code);
}

function convertWithConcurrencyPool(iconFiles) {
  return asyncPool(cpus().length, iconFiles, (iconFilePath) => {
    const filename = basename(iconFilePath, '.svg');
    const name = `${camelcase(filename, { pascalCase: true })}Icon`;

    componentNames.add(name);

    // eslint-disable-next-line no-console
    console.log(`Building: ${name}`);

    return convertToReactComponent(iconFilePath, name);
  });
}

async function generateIcons() {
  const iconFiles = await glob(SOURCE);

  // eslint-disable-next-line curly
  for await (const _result of convertWithConcurrencyPool(iconFiles));
}

function cleanDestDirectory() {
  return rimraf(DEST_PATH);
}

await cleanDestDirectory();
await generateIcons();

const indexFile = Array.from(componentNames)
  .sort()
  .map((name) => `export * from './${name}';`);

await outputFile(join(DEST_PATH, 'index.ts'), indexFile.join('\n'));

// eslint-disable-next-line no-console
console.log('Done!');
