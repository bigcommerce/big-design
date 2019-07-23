const { join } = require('path');
const { outputFile, pathExists } = require('fs-extra');
const fetch = require('node-fetch');
const inquirer = require('inquirer');
const inquirerAutocomplete = require('inquirer-autocomplete-prompt');

inquirer.registerPrompt('autocomplete', inquirerAutocomplete);

const BASE_URL = 'https://material.io/tools/icons/static';
const DEST_PATH = join(__dirname, '..', 'svgs', 'material');

async function downloadIcon(iconName) {
  console.log(`Downloading icon: ${iconName}`);

  const fileName = `round-${iconName}-24px.svg`;
  const response = await fetch(`${BASE_URL}/icons/${fileName}`);

  if (response.status !== 200) {
    throw new Error(`Error status: ${response.status}`);
  }

  const fileContent = await response.text();

  await outputFile(join(DEST_PATH, `${iconName}.svg`), fileContent);
}

function iconExists(iconName) {
  const iconFilePath = join(DEST_PATH, `${iconName}.svg`);

  return pathExists(iconFilePath);
}

async function fetchIconList() {
  const response = await fetch(`${BASE_URL}/data.json`);
  const data = await response.json();
  const icons = data.categories.reduce((acc, item) => acc.concat(item.icons), []);

  return icons.map(({ id }) => id);
}

(async () => {
  const iconList = await fetchIconList();
  const { icon } = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'icon',
      message: 'Select an icon to download',
      source: (_answersSoFar, input = '') => Promise.resolve(iconList.filter(icon => icon.includes(input))),
    },
  ]);

  const iconAlreadyExists = await iconExists(icon);

  if (iconAlreadyExists) {
    console.log(`Icon "${icon}" already exists.`);
  } else {
    await downloadIcon(icon);
  }
})();
