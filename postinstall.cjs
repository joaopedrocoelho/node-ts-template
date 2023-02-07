#!/usr/bin/env node
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

const templatePath = process.cwd();
const targetPath = path.resolve(process.cwd(), process.argv[2]);

fs.mkdirSync(targetPath, { recursive: true });

const copyFile = (file) => {
  if (file === path.basename(targetPath)) {
    return;
  }

  const templateFile = path.resolve(templatePath, file);
  const targetFile = path.resolve(targetPath, file);

  if (fs.lstatSync(templateFile).isDirectory()) {
    fs.mkdirSync(targetFile, { recursive: true });
    fs.readdirSync(templateFile).forEach((subFile) => {
      copyFile(path.join(file, subFile));
    });
  } else {
    const content = fs.readFileSync(templateFile, 'utf-8');
    fs.writeFileSync(targetFile, content);
  }
};

fs.readdirSync(templatePath)
  .filter((file) => file !== 'template.json' && file !== 'postinstall.cjs')
  .forEach(copyFile);

exec('npm install', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});