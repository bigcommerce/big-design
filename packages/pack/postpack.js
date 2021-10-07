#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const manifestPath = path.join(process.cwd(), 'package.json');
const backupPath = path.join(process.cwd(), 'backup-package.json');

fs.copyFileSync(backupPath, manifestPath);
fs.unlinkSync(backupPath);
