#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const manifestPath = path.join(process.cwd(), 'package.json');
const backupPath = path.join(process.cwd(), 'backup-package.json');

// eslint-disable-next-line import/no-dynamic-require
const manifest = require(manifestPath);

const publishManifest = {
  ...manifest,
  ...manifest.publishConfig,
};

const data = JSON.stringify(publishManifest, null, 2);

fs.copyFileSync(manifestPath, backupPath);
fs.writeFileSync(manifestPath, data);
