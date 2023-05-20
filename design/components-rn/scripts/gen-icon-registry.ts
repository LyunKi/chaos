import fs from 'fs';
import path from 'path';
import { getFileNameFromPath, pascalCase } from './common';

const OUTPUT_START: string = [
  "import * as React from 'react';",
  "import * as Svg from 'react-native-svg';",
].join('\n');

const REGISTRY = 'export const IconRegistry = {';

const OUTPUT_END: string = '};';

export function generateIndexForSourceDir(sourceDir: string) {
  const indexPath: string = path.resolve(sourceDir, 'index.ts');

  const iconFiles: string[] = fs.readdirSync(sourceDir);

  fs.appendFileSync(indexPath, OUTPUT_START);

  iconFiles.forEach((file: string) => {
    const sourceFilePath: string = path.resolve(sourceDir, file);
    const fileName: string = getFileNameFromPath(sourceFilePath);
    const componentName = pascalCase(fileName);
    fs.appendFileSync(
      indexPath,
      `\nimport {${componentName}} from './assets/${fileName}'\n`
    );
  });
  fs.appendFileSync(indexPath, REGISTRY);
  iconFiles.forEach((file: string) => {
    const sourceFilePath: string = path.resolve(sourceDir, file);
    const fileName: string = getFileNameFromPath(sourceFilePath);
    const componentName = pascalCase(fileName);
    fs.appendFileSync(indexPath, `\n${fileName}: ${componentName}\n`);
  });

  fs.appendFileSync(indexPath, OUTPUT_END);
}
