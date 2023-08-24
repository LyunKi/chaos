import fs from 'fs';
import path from 'path';
import { getFileNameFromPath, pascalCase } from './common.mjs';

const REGISTRY = '\nexport const IconRegistry = {';

const REGISTRY_END: string = '};';

export function generateIndexForSourceDir(sourceDir: string) {
  const indexPath: string = path.resolve(sourceDir, 'index.ts');

  const iconFiles: string[] = fs.readdirSync(path.join(sourceDir, 'assets'));

  iconFiles.forEach((file: string) => {
    const sourceFilePath: string = path.resolve(sourceDir, file);
    const fileName: string = getFileNameFromPath(sourceFilePath);
    const componentName = pascalCase(fileName);
    fs.appendFileSync(
      indexPath,
      `import {${componentName}} from './assets/${fileName}';\n`
    );
  });

  fs.appendFileSync(indexPath, REGISTRY);

  iconFiles.forEach((file: string) => {
    const sourceFilePath: string = path.resolve(sourceDir, file);
    const fileName: string = getFileNameFromPath(sourceFilePath);
    const componentName = pascalCase(fileName);
    fs.appendFileSync(indexPath, `'${fileName}': ${componentName},\n`);
  });

  fs.appendFileSync(indexPath, REGISTRY_END);
}
