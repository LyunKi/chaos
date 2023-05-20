import path from 'path';
import { camelCase, startCase } from 'lodash';

export function getFileNameFromPath(sourcePath: string): string {
  return path.basename(sourcePath, path.extname(sourcePath));
}

export function pascalCase(origin: string): string {
  return startCase(camelCase(origin)).replace(/ /g, '');
}
