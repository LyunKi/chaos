import fs from 'fs-extra';
import path from 'path';
import { generateIconsForSourceDir } from './gen-icon-assets.mjs';
import { generateIndexForSourceDir } from './gen-icon-index.mjs';

main('./src/icon/generated');

function main(destDir: string) {
  fs.removeSync(destDir);
  fs.ensureDirSync(path.join(destDir, 'assets'));

  generateIconsForSourceDir('./assets/fill', destDir);
  generateIconsForSourceDir('./assets/outline', destDir);

  generateIndexForSourceDir(destDir);
}
