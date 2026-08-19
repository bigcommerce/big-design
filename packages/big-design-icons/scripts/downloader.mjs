import { outputFile, pathExists } from 'fs-extra';
import inquirer from 'inquirer';
import { join } from 'path';

const DEST_PATH = join(import.meta.dirname, '..', 'svgs', 'material');

async function downloadIcon(icon) {
  // eslint-disable-next-line no-console
  console.log(`Downloading icon: ${icon.name}`);

  const response = await fetch(
    `https://fonts.gstatic.com/s/i/materialiconsround/${icon.name}/v${icon.version}/24px.svg`,
  );

  if (response.status !== 200) {
    throw new Error(`Error status: ${response.status}`);
  }

  const fileContent = await response.text();

  await outputFile(join(DEST_PATH, `${icon.name}.svg`), fileContent);
}

function iconExists(icon) {
  const iconFilePath = join(DEST_PATH, `${icon.name}.svg`);

  return pathExists(iconFilePath);
}

async function fetchIconList() {
  const response = await fetch('https://fonts.google.com/metadata/icons');
  const text = await response.text();
  const { icons } = JSON.parse(text.replace(")]}'", ''));

  return icons;
}

const iconList = await fetchIconList();
const { icon } = await inquirer.prompt([
  {
    type: 'search',
    name: 'icon',
    message: 'Select an icon to download',
    source: (input = '') =>
      Promise.resolve(
        iconList
          .filter((icon) => icon.name.startsWith(input))
          .sort()
          .map((icon) => ({ name: icon.name, value: icon })),
      ),
  },
]);

const iconAlreadyExists = await iconExists(icon);

if (iconAlreadyExists) {
  // eslint-disable-next-line no-console
  console.log(`Icon "${icon.name}" already exists.`);
} else {
  await downloadIcon(icon);
}
