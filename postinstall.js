#!/usr/bin/env node
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

const templatePath = __dirname;
const targetPath = path.resolve(process.cwd(), process.argv[2]);

fs.mkdirSync(targetPath, { recursive: true });

const copyFile = (file) => {
  const templateFile = path.resolve(templatePath, file);
  const targetFile = path.resolve(targetPath, file);

  const content = fs.readFileSync(templateFile, 'utf-8');
  fs.writeFileSync(targetFile, content);
};

fs.readdirSync(templatePath).forEach(copyFile);

exec('npm install', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});