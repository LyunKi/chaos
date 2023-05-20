import path from 'path';
import _ from 'lodash';

export function getFileNameFromPath(sourcePath: string): string {
  return path.basename(sourcePath, path.extname(sourcePath));
}

export function pascalCase(origin: string): string {
  return _.startCase(_.camelCase(origin)).replace(/ /g, '');
}
